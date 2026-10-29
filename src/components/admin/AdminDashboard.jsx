import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Ticket, 
  TrendingUp, 
  IndianRupee, 
  Bus, 
  Calendar, 
  Clock, 
  Search, 
  Download, 
  Plus, 
  Edit3, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  SlidersHorizontal,
  ChevronRight,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { formatINR, formatTime12h, formatDateIndian } from '../../utils/formatters';
import { exportBookingsToCSV } from '../../utils/csvExport';
import { Modal } from '../common/Modal';
import { CITIES } from '../../data/mockData';

export const AdminDashboard = () => {
  const { 
    buses, 
    bookings, 
    updateBookingStatus, 
    addBusSchedule, 
    updateBusSchedule, 
    resetDemoData, 
    isAdminAuth, 
    setIsAdminAuth, 
    navigateTo, 
    showToast 
  } = useBooking();

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'schedules'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  // Modals
  const [viewBookingDetails, setViewBookingDetails] = useState(null);
  const [isAddBusModalOpen, setIsAddBusModalOpen] = useState(false);
  const [editingBus, setEditingBus] = useState(null);

  // New Bus Form State
  const [newBusData, setNewBusData] = useState({
    busNumber: 'MH-12-SR-2026',
    busName: 'Sahyadri Express Executive (2+2)',
    busType: 'AC 2+2 Semi-Sleeper',
    origin: 'Pune',
    destination: 'Pandharpur',
    departureTime: '10:00',
    arrivalTime: '15:30',
    duration: '5h 30m',
    baseFare: 500
  });

  // KPI Calculations
  const metrics = useMemo(() => {
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED');
    
    // Total seats booked
    const totalSeatsBooked = bookings
      .filter(b => b.status !== 'CANCELLED')
      .reduce((sum, b) => sum + (b.selectedSeats?.length || 0), 0);

    // Total fleet seats capacity
    const totalFleetCapacity = buses.reduce((sum, bus) => sum + (bus.totalSeats || 40), 0);
    const overallOccupancy = totalFleetCapacity > 0 ? Math.round((totalSeatsBooked / totalFleetCapacity) * 100) : 0;

    // Total Demo Revenue
    const totalRevenue = bookings
      .filter(b => b.status !== 'CANCELLED')
      .reduce((sum, b) => sum + (b.totalFare || 0), 0);

    return {
      totalBookings,
      totalSeatsBooked,
      overallOccupancy,
      totalRevenue,
      confirmedCount: confirmedBookings.length
    };
  }, [bookings, buses]);

  // Filtered Bookings for Table
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = 
        !q ||
        b.pnr.toLowerCase().includes(q) ||
        b.passengerName.toLowerCase().includes(q) ||
        b.mobile.includes(q) ||
        b.origin.toLowerCase().includes(q) ||
        b.destination.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (statusFilter !== 'all' && b.status !== statusFilter) {
        return false;
      }

      if (dateFilter && b.travelDate !== dateFilter) {
        return false;
      }

      return true;
    });
  }, [bookings, searchQuery, statusFilter, dateFilter]);

  const handleCreateBus = (e) => {
    e.preventDefault();
    if (!newBusData.busNumber || !newBusData.busName || !newBusData.baseFare) {
      showToast('Please fill all bus schedule fields.', 'error');
      return;
    }
    addBusSchedule(newBusData);
    setIsAddBusModalOpen(false);
  };

  const handleUpdateBus = (e) => {
    e.preventDefault();
    if (!editingBus) return;
    updateBusSchedule(editingBus.id, {
      baseFare: Number(editingBus.baseFare),
      departureTime: editingBus.departureTime,
      arrivalTime: editingBus.arrivalTime,
      busName: editingBus.busName
    });
    setEditingBus(null);
  };

  // If not logged into demo admin
  if (!isAdminAuth) {
    return (
      <div className="max-w-md mx-auto my-16 px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-navy-950 text-saffron-400 flex items-center justify-center mx-auto shadow-md">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-navy-950">Admin Operations Console</h2>
            <p className="text-xs text-slate-500 mt-1">
              Switch role to test Maharashtra bus fleet metrics, live bookings, CSV export, and schedule modifications.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 text-left space-y-1">
            <p className="font-bold text-navy-950">Demo Role Switch:</p>
            <p className="text-[11px] text-slate-500">
              No password required. This simulated admin portal operates locally on browser state and localStorage.
            </p>
          </div>

          <button
            onClick={() => {
              setIsAdminAuth(true);
              showToast('Switched to Demo Admin Role', 'success');
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-saffron-400" />
            Enter Admin Portal (Demo Mode)
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="text-xs text-slate-500 hover:text-navy-950 font-semibold"
          >
            ← Back to Customer Booking Site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      
      {/* Admin Top Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-saffron-100 text-saffron-800 border border-saffron-300 text-[10px] font-extrabold uppercase tracking-wider">
              Simulated Operations Console
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1">
            Fleet Operations & Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time demo booking monitoring, 40-seat coach schedule manager, and customer manifest.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => exportBookingsToCSV(bookings)}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>

          <button
            onClick={resetDemoData}
            title="Reset bookings and seat availability"
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Data
          </button>

          <button
            onClick={() => {
              setIsAdminAuth(false);
              navigateTo('home');
            }}
            className="px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            Exit Admin
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Bookings */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Total Demo Bookings
            </span>
            <h3 className="text-2xl font-black text-navy-950 mt-1">
              {metrics.totalBookings}
            </h3>
            <span className="text-[11px] text-emerald-600 font-semibold">
              {metrics.confirmedCount} Active Confirmed
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Ticket className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Total Seats Booked */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Seats Booked
            </span>
            <h3 className="text-2xl font-black text-navy-950 mt-1">
              {metrics.totalSeatsBooked}
            </h3>
            <span className="text-[11px] text-slate-500">
              Across 40-seat fleet
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-saffron-50 text-saffron-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Occupancy Percentage */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Average Fleet Occupancy
            </span>
            <h3 className="text-2xl font-black text-navy-950 mt-1">
              {metrics.overallOccupancy}%
            </h3>
            <span className="text-[11px] text-emerald-600 font-semibold">
              Healthy corridor demand
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Total Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Demo Gross Revenue
            </span>
            <h3 className="text-2xl font-black text-saffron-600 mt-1">
              {formatINR(metrics.totalRevenue)}
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">
              Simulated Collections
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <IndianRupee className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 text-sm font-bold gap-6">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'bookings'
              ? 'border-saffron-500 text-saffron-600'
              : 'border-transparent text-slate-500 hover:text-navy-950'
          }`}
        >
          <Ticket className="w-4 h-4" />
          Bookings & Passengers Manifest ({bookings.length})
        </button>

        <button
          onClick={() => setActiveTab('schedules')}
          className={`pb-3 transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'schedules'
              ? 'border-saffron-500 text-saffron-600'
              : 'border-transparent text-slate-500 hover:text-navy-950'
          }`}
        >
          <Bus className="w-4 h-4" />
          Bus Schedules & 40-Seat Coaches ({buses.length})
        </button>
      </div>

      {/* TAB 1: Bookings Management */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by PNR, passenger, route, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-navy-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-saffron-500"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-navy-950 focus:bg-white focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div className="md:col-span-4">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-navy-950 focus:bg-white focus:outline-none cursor-pointer"
                placeholder="Filter by travel date"
              />
            </div>

          </div>

          {/* Bookings Table / Stacked Cards */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 border-collapse">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wider font-extrabold text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">PNR / ID</th>
                    <th className="py-3.5 px-4">Passenger Details</th>
                    <th className="py-3.5 px-4">Route & Date</th>
                    <th className="py-3.5 px-4">Seats (40 Coach)</th>
                    <th className="py-3.5 px-4">Fare (INR)</th>
                    <th className="py-3.5 px-4">Status & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((b) => (
                      <tr key={b.pnr} className="hover:bg-slate-50/80 transition-colors">
                        
                        <td className="py-3.5 px-4 font-mono font-bold text-navy-950">
                          {b.pnr}
                          <span className="block text-[10px] text-slate-400 font-normal">
                            {b.paymentMethod || 'Simulated'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <strong className="text-navy-950 font-bold block">{b.passengerName}</strong>
                          <span className="text-slate-500 text-[11px]">+91 {b.mobile}</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <strong className="text-navy-950 block">{b.origin} → {b.destination}</strong>
                          <span className="text-[11px] text-slate-500">
                            {formatDateIndian(b.travelDate)} ({formatTime12h(b.departureTime)})
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold text-saffron-600 bg-saffron-50 px-2 py-0.5 rounded border border-saffron-200">
                            {b.selectedSeats.join(', ')}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {b.selectedSeats.length} seat{b.selectedSeats.length > 1 ? 's' : ''}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-bold text-navy-950">
                          {formatINR(b.totalFare)}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <select
                              value={b.status}
                              onChange={(e) => updateBookingStatus(b.pnr, e.target.value)}
                              className={`text-[11px] font-bold rounded-lg px-2 py-1 border cursor-pointer focus:outline-none ${
                                b.status === 'CONFIRMED'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : b.status === 'CANCELLED'
                                  ? 'bg-rose-50 text-rose-800 border-rose-300'
                                  : 'bg-blue-50 text-blue-800 border-blue-300'
                              }`}
                            >
                              <option value="CONFIRMED">CONFIRMED</option>
                              <option value="COMPLETED">COMPLETED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>

                            <button
                              onClick={() => setViewBookingDetails(b)}
                              className="p-1 rounded-lg hover:bg-slate-200 text-slate-500"
                              title="View full booking JSON / details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-slate-400">
                        No bookings match the filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: Bus Fleet & Schedule Manager */}
      {activeTab === 'schedules' && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Manage daily departure times, bus numbers, and per-seat fares for Maharashtra routes.
            </p>
            <button
              onClick={() => setIsAddBusModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Bus Schedule
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {buses.map((bus) => {
              const availableSeats = bus.totalSeats - bus.bookedSeats.length;

              return (
                <div key={bus.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {bus.busNumber}
                      </span>
                      <h4 className="font-extrabold text-navy-950 text-sm mt-1">
                        {bus.busName}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {bus.origin} → {bus.destination}
                      </p>
                    </div>

                    <button
                      onClick={() => setEditingBus(bus)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-navy-950 hover:bg-slate-100"
                      title="Edit fare / timing"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Departure / Arrival:</span>
                      <strong className="text-navy-950 font-bold">{formatTime12h(bus.departureTime)} → {formatTime12h(bus.arrivalTime)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Base Fare:</span>
                      <strong className="text-saffron-600 font-extrabold">{formatINR(bus.baseFare)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Seat Occupancy:</span>
                      <span className="font-semibold text-navy-950">
                        {bus.bookedSeats.length} / 40 ({availableSeats} Available)
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 truncate">
                    Booked Seat IDs: {bus.bookedSeats.length > 0 ? bus.bookedSeats.join(', ') : 'None'}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Modal: View Booking Details */}
      <Modal
        isOpen={!!viewBookingDetails}
        onClose={() => setViewBookingDetails(null)}
        title={`Booking Record: ${viewBookingDetails?.pnr}`}
        maxWidth="max-w-lg"
      >
        {viewBookingDetails && (
          <div className="space-y-3 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between"><span className="text-slate-500">Passenger:</span><strong className="text-navy-950">{viewBookingDetails.passengerName}</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Mobile:</span><strong className="text-navy-950">+91 {viewBookingDetails.mobile}</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Email:</span><strong className="text-navy-950">{viewBookingDetails.email || 'N/A'}</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Route:</span><strong className="text-navy-950">{viewBookingDetails.origin} → {viewBookingDetails.destination}</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Travel Date:</span><strong className="text-navy-950">{formatDateIndian(viewBookingDetails.travelDate)}</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Boarding Point:</span><strong className="text-navy-950">{viewBookingDetails.boardingPoint}</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Seats Booked:</span><strong className="text-saffron-600">{viewBookingDetails.selectedSeats.join(', ')}</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Total Amount:</span><strong className="text-emerald-700 font-bold">{formatINR(viewBookingDetails.totalFare)}</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Payment Status:</span><strong className="text-navy-950">{viewBookingDetails.paymentStatus} ({viewBookingDetails.paymentMethod})</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Booking Status:</span><strong className="text-navy-950 uppercase">{viewBookingDetails.status}</strong></div>
            </div>
            <button
              onClick={() => setViewBookingDetails(null)}
              className="w-full py-2.5 bg-navy-900 text-white rounded-xl font-bold"
            >
              Close Record
            </button>
          </div>
        )}
      </Modal>

      {/* Modal: Add Bus Schedule */}
      <Modal
        isOpen={isAddBusModalOpen}
        onClose={() => setIsAddBusModalOpen(false)}
        title="Add New Maharashtra Bus Schedule"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateBus} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-600 mb-1">Bus Number (MH RTO):</label>
            <input
              type="text"
              value={newBusData.busNumber}
              onChange={(e) => setNewBusData({ ...newBusData, busNumber: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-mono"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-600 mb-1">Bus Name / Service:</label>
            <input
              type="text"
              value={newBusData.busName}
              onChange={(e) => setNewBusData({ ...newBusData, busName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-slate-600 mb-1">Origin:</label>
              <select
                value={newBusData.origin}
                onChange={(e) => setNewBusData({ ...newBusData, origin: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
              >
                {CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-600 mb-1">Destination:</label>
              <select
                value={newBusData.destination}
                onChange={(e) => setNewBusData({ ...newBusData, destination: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
              >
                {CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block font-bold text-slate-600 mb-1">Departure:</label>
              <input
                type="time"
                value={newBusData.departureTime}
                onChange={(e) => setNewBusData({ ...newBusData, departureTime: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-600 mb-1">Arrival:</label>
              <input
                type="time"
                value={newBusData.arrivalTime}
                onChange={(e) => setNewBusData({ ...newBusData, arrivalTime: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-600 mb-1">Fare (₹):</label>
              <input
                type="number"
                value={newBusData.baseFare}
                onChange={(e) => setNewBusData({ ...newBusData, baseFare: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-saffron-600 hover:bg-saffron-700 text-white font-bold rounded-xl"
            >
              Add to Active Fleet
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Edit Existing Bus */}
      <Modal
        isOpen={!!editingBus}
        onClose={() => setEditingBus(null)}
        title={`Edit Schedule: ${editingBus?.busNumber}`}
        maxWidth="max-w-md"
      >
        {editingBus && (
          <form onSubmit={handleUpdateBus} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-600 mb-1">Bus Name:</label>
              <input
                type="text"
                value={editingBus.busName}
                onChange={(e) => setEditingBus({ ...editingBus, busName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-600 mb-1">Departure Time:</label>
                <input
                  type="time"
                  value={editingBus.departureTime}
                  onChange={(e) => setEditingBus({ ...editingBus, departureTime: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-600 mb-1">Arrival Time:</label>
                <input
                  type="time"
                  value={editingBus.arrivalTime}
                  onChange={(e) => setEditingBus({ ...editingBus, arrivalTime: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">Base Fare per Seat (₹):</label>
              <input
                type="number"
                value={editingBus.baseFare}
                onChange={(e) => setEditingBus({ ...editingBus, baseFare: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-xl"
              >
                Save Schedule Changes
              </button>
            </div>
          </form>
        )}
      </Modal>

    </div>
  );
};

