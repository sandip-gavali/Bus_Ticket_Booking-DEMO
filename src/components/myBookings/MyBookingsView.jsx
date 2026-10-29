import React, { useState } from 'react';
import { 
  Search, 
  Ticket, 
  Calendar, 
  Clock, 
  MapPin, 
  XCircle, 
  Printer, 
  AlertTriangle, 
  ShieldAlert, 
  RotateCcw, 
  Filter,
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { formatINR, formatTime12h, formatDateIndian } from '../../utils/formatters';
import { Modal } from '../common/Modal';
import { EmptyState } from '../common/EmptyState';

export const MyBookingsView = () => {
  const { 
    bookings, 
    cancelBooking, 
    setActiveTicket, 
    setIsTicketOpen, 
    navigateTo, 
    showToast 
  } = useBooking();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'CONFIRMED' | 'CANCELLED'

  // Cancellation Modal State
  const [cancellingBooking, setCancellingBooking] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // Filter bookings based on search query (PNR, Mobile, Name) and status
  const filteredBookings = bookings.filter(b => {
    const q = searchQuery.trim().toLowerCase();
    const matchQuery = 
      !q || 
      b.pnr.toLowerCase().includes(q) || 
      b.mobile.includes(q) || 
      b.passengerName.toLowerCase().includes(q);

    if (!matchQuery) return false;

    if (statusFilter !== 'all' && b.status !== statusFilter) {
      return false;
    }

    return true;
  });

  const handleOpenCancelModal = (booking) => {
    setCancellingBooking(booking);
    setIsCancelModalOpen(true);
  };

  const handleConfirmCancel = () => {
    if (!cancellingBooking) return;
    const ok = cancelBooking(cancellingBooking.pnr);
    if (ok) {
      setIsCancelModalOpen(false);
      setCancellingBooking(null);
    }
  };

  // Calculate cancellation deduction
  const getCancellationDetails = (booking) => {
    if (!booking) return { feePercent: 10, feeAmount: 0, refundAmount: 0 };
    
    // Assume 10% demo fee default
    const feePercent = 10;
    const feeAmount = Math.round((booking.totalFare * feePercent) / 100);
    const refundAmount = booking.totalFare - feeAmount;

    return { feePercent, feeAmount, refundAmount };
  };

  const cancelCalc = getCancellationDetails(cancellingBooking);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      {/* Title & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 flex items-center gap-2.5">
            <Ticket className="w-7 h-7 text-saffron-500" />
            My Bookings & PNR Inquiry
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Search demo tickets, view printable boarding passes, and simulate booking cancellations.
          </p>
        </div>

        <button
          onClick={() => navigateTo('home')}
          className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
        >
          <span>Book New Journey</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Search and Filter Strip */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          <div className="md:col-span-8 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Demo PNR (e.g. SRT-MH-26781) or Mobile Number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-navy-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-saffron-500 transition-all"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600 justify-between">
            <button
              onClick={() => setStatusFilter('all')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                statusFilter === 'all' ? 'bg-white text-navy-950 shadow-sm' : 'hover:text-navy-950'
              }`}
            >
              All ({bookings.length})
            </button>
            <button
              onClick={() => setStatusFilter('CONFIRMED')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                statusFilter === 'CONFIRMED' ? 'bg-white text-emerald-800 shadow-sm' : 'hover:text-navy-950'
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setStatusFilter('CANCELLED')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                statusFilter === 'CANCELLED' ? 'bg-white text-rose-800 shadow-sm' : 'hover:text-navy-950'
              }`}
            >
              Cancelled
            </button>
          </div>

        </div>
      </div>

      {/* Bookings List Cards */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-5">
          {filteredBookings.map((b) => {
            const isConfirmed = b.status === 'CONFIRMED';
            const isCancelled = b.status === 'CANCELLED';

            return (
              <div
                key={b.pnr}
                className={`bg-white rounded-3xl border transition-all overflow-hidden shadow-sm hover:shadow-md ${
                  isCancelled ? 'border-rose-200 bg-rose-50/20' : 'border-slate-200'
                }`}
              >
                <div className="p-5 sm:p-6">
                  
                  {/* Top PNR & Status Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center font-bold">
                        <Ticket className="w-5 h-5 text-saffron-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-sm sm:text-base text-navy-950">
                            {b.pnr}
                          </span>
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            isConfirmed
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : isCancelled
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : 'bg-blue-100 text-blue-800 border border-blue-200'
                          }`}>
                            {b.status} (DEMO)
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          {b.busName} · {b.busNumber}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Fare Paid
                      </span>
                      <span className="text-lg font-black text-navy-950">
                        {formatINR(b.totalFare)}
                      </span>
                    </div>
                  </div>

                  {/* Middle Details Grid */}
                  <div className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    
                    {/* Origin & Destination */}
                    <div className="sm:col-span-6 space-y-1">
                      <div className="flex items-center gap-2 text-base font-extrabold text-navy-950">
                        <span>{b.origin}</span>
                        <span className="text-saffron-500">→</span>
                        <span>{b.destination}</span>
                      </div>
                      <p className="text-xs text-slate-600 flex items-center gap-3">
                        <span><strong>Date:</strong> {formatDateIndian(b.travelDate)}</span>
                        <span>•</span>
                        <span><strong>Departure:</strong> {formatTime12h(b.departureTime)}</span>
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        Boarding: {b.boardingPoint || 'Central Lounge'}
                      </p>
                    </div>

                    {/* Passenger & Seats Info */}
                    <div className="sm:col-span-6 space-y-1 text-xs sm:text-right">
                      <p className="text-slate-600">
                        Passenger: <strong className="text-navy-950">{b.passengerName}</strong> (+91 {b.mobile})
                      </p>
                      <p className="text-slate-600">
                        Seats Booked: <strong className="text-saffron-600 font-mono font-bold text-sm">
                          {b.selectedSeats.join(', ')}
                        </strong>
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Payment: {b.paymentMethod || 'Simulated UPI'}
                      </p>
                    </div>

                  </div>

                  {/* Action Buttons Row */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    
                    <div className="text-[11px] text-slate-400">
                      {isCancelled ? (
                        <span className="text-rose-600 font-semibold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          Seats were released back to inventory. Demo refund processed.
                        </span>
                      ) : (
                        <span>Valid for boarding simulation on scheduled date.</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveTicket(b);
                          setIsTicketOpen(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        View / Print Ticket
                      </button>

                      {isConfirmed && (
                        <button
                          onClick={() => handleOpenCancelModal(b)}
                          className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Cancel Booking
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Ticket}
          title={searchQuery ? 'No Bookings Match Your Search' : 'No Bookings Found'}
          description={searchQuery 
            ? `We couldn't find any booking with "${searchQuery}". Please check the demo PNR or mobile number.`
            : 'You have not booked any demo bus tickets yet. Search our luxury coaches to make your first demo booking!'
          }
          actionLabel="Book a Bus Ticket"
          onAction={() => navigateTo('home')}
        />
      )}

      {/* Cancellation Confirmation Modal */}
      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="Confirm Demo Booking Cancellation"
        subtitle={`PNR: ${cancellingBooking?.pnr}`}
        maxWidth="max-w-md"
      >
        {cancellingBooking && (
          <div className="space-y-4 text-xs">
            
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-amber-950 flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-amber-900 mb-0.5">Demo Cancellation Notice</h5>
                <p className="leading-relaxed">
                  Cancelling this demo booking will release <strong>Seats {cancellingBooking.selectedSeats.join(', ')}</strong> back to the available seat pool.
                </p>
              </div>
            </div>

            {/* Simulated Refund Breakdown */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Original Fare Paid:</span>
                <span className="font-bold text-navy-950">{formatINR(cancellingBooking.totalFare)}</span>
              </div>
              <div className="flex justify-between text-rose-700">
                <span>Demo Cancellation Fee ({cancelCalc.feePercent}%):</span>
                <span className="font-bold">- {formatINR(cancelCalc.feeAmount)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold text-sm pt-2 border-t border-slate-200">
                <span>Estimated Demo Refund:</span>
                <span className="text-base">{formatINR(cancelCalc.refundAmount)}</span>
              </div>
            </div>

            <div className="bg-slate-100 p-2.5 rounded-xl text-[11px] text-slate-500 text-center">
              * Note: Strictly simulated. No actual refund is credited to any bank account.
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCancelModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
              >
                Keep Booking
              </button>

              <button
                type="button"
                onClick={handleConfirmCancel}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-colors shadow-md shadow-rose-600/20"
              >
                Confirm Cancellation
              </button>
            </div>

          </div>
        )}
      </Modal>

    </div>
  );
};

