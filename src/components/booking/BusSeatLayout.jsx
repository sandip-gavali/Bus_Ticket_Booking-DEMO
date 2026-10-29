import React, { useState } from 'react';
import { 
  Bus, 
  ArrowLeft, 
  Check, 
  Lock, 
  User, 
  Sparkles, 
  Info, 
  ShieldCheck, 
  Compass, 
  ChevronRight,
  Disc
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { COACH_40_SEATS } from '../../data/mockData';
import { formatINR, formatTime12h, formatDateIndian } from '../../utils/formatters';

export const BusSeatLayout = () => {
  const { 
    selectedBus, 
    selectedSeats, 
    toggleSeat, 
    navigateTo, 
    searchParams,
    showToast 
  } = useBooking();

  const [preferenceFilter, setPreferenceFilter] = useState('all'); // 'all' | 'window' | 'aisle'

  if (!selectedBus) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 mb-4">No bus selected for seating map.</p>
        <button
          onClick={() => navigateTo('home')}
          className="px-4 py-2 bg-navy-900 text-white rounded-xl text-sm font-semibold"
        >
          Back to Buses
        </button>
      </div>
    );
  }

  const baseFare = selectedBus.baseFare;
  const subtotal = selectedSeats.length * baseFare;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  // Categorize seats for rendering rows 1 to 9
  const rows1to9 = [];
  for (let r = 1; r <= 9; r++) {
    const rowSeats = COACH_40_SEATS.filter(s => s.row === r);
    rows1to9.push({
      rowNum: r,
      leftWindow: rowSeats.find(s => s.side === 'left' && s.position === 'window'),
      leftAisle: rowSeats.find(s => s.side === 'left' && s.position === 'aisle'),
      rightAisle: rowSeats.find(s => s.side === 'right' && s.position === 'aisle'),
      rightWindow: rowSeats.find(s => s.side === 'right' && s.position === 'window'),
    });
  }

  // Row 10 (Rear row continuous: 37, 38, 39, 40)
  const rearRowSeats = COACH_40_SEATS.filter(s => s.row === 10);

  const getSeatStatus = (seatNum) => {
    if (selectedBus.bookedSeats.includes(seatNum)) return 'booked';
    if (selectedSeats.includes(seatNum)) return 'selected';
    return 'available';
  };

  const renderSeatButton = (seat) => {
    if (!seat) return null;
    const status = getSeatStatus(seat.number);
    const isBooked = status === 'booked';
    const isSelected = status === 'selected';

    const matchesPreference = 
      preferenceFilter === 'all' || 
      (preferenceFilter === 'window' && seat.position === 'window') ||
      (preferenceFilter === 'aisle' && seat.position === 'aisle');

    let btnClass = 'relative flex flex-col items-center justify-center rounded-xl p-1 sm:p-1.5 transition-all focus:outline-none min-h-[48px] sm:min-h-[52px] min-w-[42px] sm:min-w-[48px] font-bold text-xs select-none ';

    if (isBooked) {
      btnClass += 'bg-slate-200/80 text-slate-400 border border-slate-300 cursor-not-allowed opacity-75';
    } else if (isSelected) {
      btnClass += 'bg-gradient-to-br from-saffron-500 to-saffron-600 text-white border-2 border-saffron-600 shadow-md transform scale-105 z-10';
    } else {
      // Available
      if (matchesPreference) {
        btnClass += 'bg-white text-navy-950 border-2 border-slate-300 hover:border-saffron-400 hover:bg-saffron-50/50 shadow-sm hover:shadow cursor-pointer';
      } else {
        btnClass += 'bg-white text-slate-400 border border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-300 cursor-pointer';
      }
    }

    return (
      <button
        key={seat.id}
        type="button"
        disabled={isBooked}
        onClick={() => toggleSeat(seat.number)}
        title={`Seat ${seat.number} (${seat.position.toUpperCase()}) - ${isBooked ? 'Booked' : isSelected ? 'Selected' : 'Available ₹' + baseFare}`}
        aria-label={`Seat ${seat.number}, ${seat.position} seat, status: ${status}`}
        className={btnClass}
      >
        {/* Top Mini Badge: Position (W = Window, A = Aisle, C = Center) */}
        <span className={`text-[9px] uppercase font-mono tracking-tighter leading-none mb-0.5 ${
          isSelected ? 'text-saffron-100' : isBooked ? 'text-slate-400' : 'text-slate-400'
        }`}>
          {seat.position === 'window' ? 'W' : seat.position === 'aisle' ? 'A' : 'C'}
        </span>

        {/* Seat Number */}
        <span className="text-xs sm:text-sm font-extrabold leading-none">
          {seat.number}
        </span>

        {/* Status Indicator Icon */}
        <div className="mt-0.5">
          {isSelected ? (
            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
          ) : isBooked ? (
            <Lock className="w-3 h-3 text-slate-400" />
          ) : (
            <div className={`w-1.5 h-1.5 rounded-full ${matchesPreference ? 'bg-emerald-500' : 'bg-slate-300'}`} />
          )}
        </div>
      </button>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Back Button and Bus Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-navy-950 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" />
          Change Bus Schedule
        </button>

        <div className="text-right">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Selected Coach
          </span>
          <h2 className="text-sm sm:text-base font-extrabold text-navy-950">
            {selectedBus.busName} ({selectedBus.busNumber})
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Top-Down Bus Layout */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-md">
          
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-navy-950 text-base flex items-center gap-2">
                <Bus className="w-5 h-5 text-saffron-600" />
                40-Seat Passenger Layout
              </h3>
              <p className="text-xs text-slate-500">
                2+2 Semi-Sleeper with Central Aisle (Seats 1 to 40)
              </p>
            </div>

            {/* Quick Preference Filter */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setPreferenceFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  preferenceFilter === 'all' ? 'bg-white text-navy-950 shadow-sm' : 'text-slate-600'
                }`}
              >
                All (40)
              </button>
              <button
                type="button"
                onClick={() => setPreferenceFilter('window')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  preferenceFilter === 'window' ? 'bg-white text-navy-950 shadow-sm' : 'text-slate-600'
                }`}
              >
                Window (W)
              </button>
              <button
                type="button"
                onClick={() => setPreferenceFilter('aisle')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  preferenceFilter === 'aisle' ? 'bg-white text-navy-950 shadow-sm' : 'text-slate-600'
                }`}
              >
                Aisle (A)
              </button>
            </div>
          </div>

          {/* Seat Status Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 p-3 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <span className="font-medium text-slate-700">Available</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-saffron-500 text-white flex items-center justify-center">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="font-medium text-slate-700">Selected</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-slate-200 text-slate-400 flex items-center justify-center border border-slate-300">
                <Lock className="w-2.5 h-2.5" />
              </div>
              <span className="font-medium text-slate-700">Booked</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="font-mono font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">W</span>
              <span>= Window</span>
            </div>
          </div>

          {/* Bus Physical Shell (Visual Top-Down View) */}
          <div className="relative mx-auto max-w-[360px] sm:max-w-[400px] bg-slate-100 rounded-[40px] p-4 sm:p-5 border-4 border-slate-300/80 shadow-inner">
            
            {/* Front Windshield and Driver Area */}
            <div className="pb-4 mb-4 border-b-2 border-dashed border-slate-300">
              <div className="bg-slate-200 rounded-2xl p-2.5 flex items-center justify-between text-xs text-slate-600">
                {/* Left Passenger Door Entry */}
                <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg border border-slate-300 font-bold text-[10px] text-emerald-800 uppercase tracking-wider">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Entry Door
                </div>

                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                  FRONT · CABIN
                </span>

                {/* Right Driver Cabin (RHD India) */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-navy-900 text-white rounded-lg font-bold text-[11px] shadow-sm">
                  <Disc className="w-4 h-4 text-saffron-400 animate-spin-slow" />
                  <span>Driver</span>
                </div>
              </div>
            </div>

            {/* Rows 1 to 9 (36 Seats) */}
            <div className="space-y-2">
              {rows1to9.map(({ rowNum, leftWindow, leftAisle, rightAisle, rightWindow }) => (
                <div key={rowNum} className="flex items-center justify-between gap-1 sm:gap-2">
                  
                  {/* Left Pair (Window + Aisle) */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    {renderSeatButton(leftWindow)}
                    {renderSeatButton(leftAisle)}
                  </div>

                  {/* Central Walkway Aisle */}
                  <div className="flex-1 flex flex-col items-center justify-center px-1 text-slate-400 select-none">
                    <span className="text-[10px] font-mono font-semibold text-slate-400">
                      R{rowNum}
                    </span>
                  </div>

                  {/* Right Pair (Aisle + Window) */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    {renderSeatButton(rightAisle)}
                    {renderSeatButton(rightWindow)}
                  </div>

                </div>
              ))}
            </div>

            {/* Row 10: Rear Row Continuous 4 Seats (37, 38, 39, 40) */}
            <div className="mt-3 pt-3 border-t-2 border-dashed border-slate-300">
              <div className="text-center mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Rear Row (Seats 37 – 40)
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1 sm:gap-2">
                {rearRowSeats.map((seat) => renderSeatButton(seat))}
              </div>
            </div>

            {/* Rear of Bus Bumper */}
            <div className="mt-4 pt-2 text-center text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              BACK OF COACH · ENGINE
            </div>

          </div>

        </div>

        {/* Right Column: Live Selection Summary & Fare Calculation */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
            <h3 className="font-extrabold text-navy-950 text-base mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Booking Summary</span>
              <span className="text-xs font-bold text-saffron-600 bg-saffron-50 px-2.5 py-0.5 rounded-full border border-saffron-200">
                {selectedSeats.length} of {searchParams.passengerCount} Seat{searchParams.passengerCount > 1 ? 's' : ''}
              </span>
            </h3>

            {/* Journey Details Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mb-4 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Route:</span>
                <strong className="text-navy-950 font-bold">{selectedBus.origin} → {selectedBus.destination}</strong>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Date:</span>
                <strong className="text-navy-950 font-bold">{formatDateIndian(searchParams.travelDate)}</strong>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Departure:</span>
                <strong className="text-navy-950 font-bold">{formatTime12h(selectedBus.departureTime)} ({selectedBus.duration})</strong>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Fare per seat:</span>
                <strong className="text-saffron-600 font-bold">{formatINR(selectedBus.baseFare)}</strong>
              </div>
            </div>

            {/* Selected Seats Chips */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Selected Seats:
              </label>
              {selectedSeats.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map((seatNum) => {
                    const seatData = COACH_40_SEATS.find(s => s.number === seatNum);
                    return (
                      <div 
                        key={seatNum} 
                        className="flex items-center gap-2 bg-saffron-50 text-saffron-900 border border-saffron-200 px-3 py-1.5 rounded-xl text-xs font-bold"
                      >
                        <span>Seat {seatNum}</span>
                        <span className="text-[10px] text-saffron-600 font-normal">
                          ({seatData?.position.toUpperCase()})
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleSeat(seatNum)}
                          className="hover:text-rose-600 font-black ml-1 text-sm leading-none"
                          title="Deselect seat"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center text-xs text-slate-500">
                  Tap any available seat on the coach blueprint to select it.
                </div>
              )}
            </div>

            {/* Fare Breakdown */}
            <div className="space-y-2 py-4 border-t border-b border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Fare ({selectedSeats.length} × {formatINR(selectedBus.baseFare)}):</span>
                <span className="font-semibold text-navy-950">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Goods & Service Tax (GST 5%):</span>
                <span className="font-semibold text-navy-950">{formatINR(gst)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-navy-950 pt-2 border-t border-slate-100">
                <span>Total Amount:</span>
                <span className="text-saffron-600 text-lg font-black">{formatINR(total)}</span>
              </div>
            </div>

            {/* Proceed CTA Button */}
            <div className="mt-6">
              <button
                disabled={selectedSeats.length === 0}
                onClick={() => {
                  if (selectedSeats.length === 0) {
                    showToast('Please select at least one seat to proceed.', 'warning');
                    return;
                  }
                  navigateTo('passenger-details');
                }}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                  selectedSeats.length > 0
                    ? 'bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white shadow-saffron-500/25 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                <span>Continue to Passenger Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              {selectedSeats.length === 0 && (
                <p className="text-[11px] text-slate-400 text-center mt-2">
                  Select at least 1 seat on the bus layout above
                </p>
              )}
            </div>

          </div>

          {/* Cancellation Policy Preview Pill */}
          <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200/80 text-xs text-blue-900 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold mb-1">Easy Cancellation Policy</h5>
              <p className="text-blue-800 leading-relaxed text-[11px]">
                Cancel up to 24 hrs prior for only 10% fee. Demo cancellation can be simulated anytime in 'My Bookings'.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

