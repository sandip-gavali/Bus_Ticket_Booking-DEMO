import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_BUSES, INITIAL_DEMO_BOOKINGS } from '../data/mockData';
import { generatePNR } from '../utils/formatters';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  // Tomorrow's date as default travel date
  const getDefaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  // LocalStorage-backed state for buses
  const [buses, setBuses] = useState(() => {
    const saved = localStorage.getItem('sahyadri_buses');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_BUSES;
  });

  // LocalStorage-backed state for demo bookings
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('sahyadri_bookings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_DEMO_BOOKINGS;
  });

  // Synchronize to localStorage
  useEffect(() => {
    localStorage.setItem('sahyadri_buses', JSON.stringify(buses));
  }, [buses]);

  useEffect(() => {
    localStorage.setItem('sahyadri_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Active view navigation
  // views: 'home' | 'buses' | 'seat-selection' | 'passenger-details' | 'my-bookings' | 'admin'
  const [currentView, setCurrentView] = useState('home');

  // Search parameters
  const [searchParams, setSearchParams] = useState({
    origin: 'Pune',
    destination: 'Pandharpur',
    travelDate: getDefaultDate(),
    passengerCount: 1
  });

  // Customer booking flow state
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState({
    name: '',
    gender: 'Male',
    age: '',
    mobile: '',
    email: '',
    boardingPoint: '',
    droppingPoint: '',
    couponCode: '',
    discount: 0
  });

  // Active modals
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState(null);
  const [isAdminAuth, setIsAdminAuth] = useState(false);

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info', duration = 4000) => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev && prev.message === message ? null : prev));
    }, duration);
  };

  // Switch views smoothly and scroll to top
  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start booking for a bus
  const startSeatSelection = (bus) => {
    setSelectedBus(bus);
    setSelectedSeats([]);
    // Pre-populate boarding & dropping points from bus or defaults
    setPassengerDetails((prev) => ({
      ...prev,
      boardingPoint: '',
      droppingPoint: ''
    }));
    navigateTo('seat-selection');
  };

  // Toggle seat selection
  const toggleSeat = (seatNumber) => {
    if (!selectedBus) return;
    
    // Check if seat is already booked
    if (selectedBus.bookedSeats.includes(seatNumber)) {
      showToast(`Seat ${seatNumber} is already booked by another traveler.`, 'warning');
      return;
    }

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      // Check passenger limit
      if (selectedSeats.length >= searchParams.passengerCount) {
        // Automatically allow expanding passenger count or inform user
        if (selectedSeats.length >= 6) {
          showToast('Maximum 6 seats can be selected per booking demo.', 'warning');
          return;
        }
        // Increment passenger count to match
        setSearchParams((prev) => ({ ...prev, passengerCount: prev.passengerCount + 1 }));
      }
      setSelectedSeats([...selectedSeats, seatNumber].sort((a, b) => a - b));
    }
  };

  // Confirm booking after simulated payment success
  const confirmBooking = (paymentData) => {
    if (!selectedBus || selectedSeats.length === 0) return null;

    const baseFareTotal = selectedSeats.length * selectedBus.baseFare;
    const gstTotal = Math.round(baseFareTotal * 0.05);
    const finalTotal = Math.max(0, baseFareTotal + gstTotal - (passengerDetails.discount || 0));

    const newPNR = generatePNR();

    const newBooking = {
      pnr: newPNR,
      busId: selectedBus.id,
      busName: selectedBus.busName,
      busNumber: selectedBus.busNumber,
      busType: selectedBus.busType,
      origin: selectedBus.origin,
      destination: selectedBus.destination,
      travelDate: searchParams.travelDate,
      departureTime: selectedBus.departureTime,
      arrivalTime: selectedBus.arrivalTime,
      boardingPoint: passengerDetails.boardingPoint,
      droppingPoint: passengerDetails.droppingPoint,
      passengerName: passengerDetails.name.trim(),
      gender: passengerDetails.gender,
      age: passengerDetails.age || '32',
      mobile: passengerDetails.mobile.trim(),
      email: passengerDetails.email.trim() || 'demo.passenger@mahayatra.in',
      selectedSeats: [...selectedSeats],
      farePerSeat: selectedBus.baseFare,
      baseFare: baseFareTotal,
      gst: gstTotal,
      discount: passengerDetails.discount || 0,
      couponApplied: passengerDetails.couponCode || null,
      totalFare: finalTotal,
      paymentMethod: paymentData.method || 'Simulated UPI',
      paymentStatus: 'Paid (Simulated)',
      status: 'CONFIRMED',
      bookedAt: new Date().toISOString()
    };

    // 1. Update bus seat inventory: add selectedSeats to bookedSeats
    setBuses((prevBuses) =>
      prevBuses.map((bus) => {
        if (bus.id === selectedBus.id) {
          return {
            ...bus,
            bookedSeats: [...new Set([...bus.bookedSeats, ...selectedSeats])]
          };
        }
        return bus;
      })
    );

    // 2. Add to demo bookings list
    setBookings((prevBookings) => [newBooking, ...prevBookings]);

    // 3. Set active ticket and open ticket modal
    setActiveTicket(newBooking);
    setIsTicketOpen(true);
    setIsPaymentOpen(false);

    showToast(`Booking Confirmed! Demo PNR: ${newPNR}`, 'success', 5000);

    return newBooking;
  };

  // Demo Cancel Booking
  const cancelBooking = (pnr) => {
    const booking = bookings.find((b) => b.pnr === pnr);
    if (!booking) return false;

    if (booking.status === 'CANCELLED') {
      showToast('This booking is already cancelled.', 'info');
      return false;
    }

    // 1. Release the booked seats back to the bus
    setBuses((prevBuses) =>
      prevBuses.map((bus) => {
        if (bus.id === booking.busId) {
          return {
            ...bus,
            bookedSeats: bus.bookedSeats.filter((seatNum) => !booking.selectedSeats.includes(seatNum))
          };
        }
        return bus;
      })
    );

    // 2. Mark booking as CANCELLED
    setBookings((prevBookings) =>
      prevBookings.map((b) => {
        if (b.pnr === pnr) {
          return {
            ...b,
            status: 'CANCELLED',
            cancelledAt: new Date().toISOString()
          };
        }
        return b;
      })
    );

    showToast(`Booking ${pnr} has been cancelled in demo mode. Seats released!`, 'info', 4500);
    return true;
  };

  // Admin: Update any booking status
  const updateBookingStatus = (pnr, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.pnr === pnr ? { ...b, status: newStatus } : b))
    );
    showToast(`Booking ${pnr} status changed to ${newStatus}`, 'info');
  };

  // Admin: Add new bus schedule
  const addBusSchedule = (newBus) => {
    const busWithId = {
      ...newBus,
      id: `SRT-EXT-${Date.now().toString().slice(-4)}`,
      totalSeats: 40,
      bookedSeats: [],
      rating: 4.8,
      reviewsCount: 12
    };
    setBuses((prev) => [busWithId, ...prev]);
    showToast(`New Bus ${newBus.busNumber} added successfully to schedule!`, 'success');
  };

  // Admin: Edit bus schedule
  const updateBusSchedule = (busId, updatedFields) => {
    setBuses((prev) =>
      prev.map((b) => (b.id === busId ? { ...b, ...updatedFields } : b))
    );
    showToast(`Bus schedule updated successfully!`, 'success');
  };

  // Reset demo state back to default
  const resetDemoData = () => {
    localStorage.removeItem('sahyadri_buses');
    localStorage.removeItem('sahyadri_bookings');
    setBuses(INITIAL_BUSES);
    setBookings(INITIAL_DEMO_BOOKINGS);
    setSelectedSeats([]);
    setSelectedBus(null);
    showToast('Demo data reset to default sample schedules and bookings.', 'info');
  };

  return (
    <BookingContext.Provider
      value={{
        buses,
        bookings,
        currentView,
        navigateTo,
        searchParams,
        setSearchParams,
        selectedBus,
        setSelectedBus,
        startSeatSelection,
        selectedSeats,
        setSelectedSeats,
        toggleSeat,
        passengerDetails,
        setPassengerDetails,
        isPaymentOpen,
        setIsPaymentOpen,
        isTicketOpen,
        setIsTicketOpen,
        activeTicket,
        setActiveTicket,
        confirmBooking,
        cancelBooking,
        updateBookingStatus,
        addBusSchedule,
        updateBusSchedule,
        resetDemoData,
        isAdminAuth,
        setIsAdminAuth,
        toast,
        showToast
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

