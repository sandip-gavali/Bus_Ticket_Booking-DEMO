import React from 'react';
import { 
  Printer, 
  Download, 
  Copy, 
  Check, 
  Share2, 
  Bus, 
  Calendar, 
  Clock, 
  MapPin, 
  QrCode, 
  ShieldAlert, 
  ArrowRight,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { useBooking } from '../../context/BookingContext';
import { formatINR, formatTime12h, formatDateIndian } from '../../utils/formatters';

export const ETicketModal = () => {
  const { 
    isTicketOpen, 
    setIsTicketOpen, 
    activeTicket, 
    navigateTo, 
    showToast 
  } = useBooking();

  const [copied, setCopied] = React.useState(false);

  if (!activeTicket) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const text = `SAHYADRI ROYAL TRAVELS (DEMO TICKET)\nPNR: ${activeTicket.pnr}\nPassenger: ${activeTicket.passengerName}\nRoute: ${activeTicket.origin} to ${activeTicket.destination}\nDate: ${formatDateIndian(activeTicket.travelDate)}\nDeparture: ${formatTime12h(activeTicket.departureTime)}\nSeats: ${activeTicket.selectedSeats.join(', ')}\nTotal Fare: ${formatINR(activeTicket.totalFare)}\nStatus: CONFIRMED (DEMO)`;
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      showToast('Demo ticket details copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <Modal
      isOpen={isTicketOpen}
      onClose={() => setIsTicketOpen(false)}
      title="Official E-Ticket / Boarding Pass (Demo)"
      subtitle="Your simulated luxury bus journey has been confirmed"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        
        {/* Printable Ticket Container */}
        <div className="printable-ticket bg-white rounded-3xl border-2 border-navy-900 shadow-xl overflow-hidden relative">
          
          {/* Top Demo Watermark Banner */}
          <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 text-white text-center py-2 px-4 text-xs font-black uppercase tracking-widest shadow-inner">
            ⚠️ DEMO TICKET — NOT VALID FOR ACTUAL TRAVEL / प्रवासासाठी वैध नाही
          </div>

          {/* Ticket Header */}
          <div className="p-5 sm:p-6 bg-navy-950 text-white flex flex-wrap items-center justify-between gap-4 border-b border-navy-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-saffron-500 flex items-center justify-center text-white shadow-lg shadow-saffron-500/30">
                <Bus className="w-7 h-7" />
              </div>
              <div>
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                  Sahyadri Royal Travels
                </span>
                <p className="text-xs text-saffron-400 font-medium">
                  सह्याद्री रॉयल ट्रॅव्हल्स · Maharashtra Luxury Line
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest">
                Booking ID / PNR
              </span>
              <span className="text-lg sm:text-xl font-mono font-black text-saffron-400 tracking-wider">
                {activeTicket.pnr}
              </span>
            </div>
          </div>

          {/* Main Ticket Body */}
          <div className="p-5 sm:p-6 space-y-6 bg-white">
            
            {/* Route & Times Visual */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              
              <div className="sm:col-span-5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Origin Boarding
                </span>
                <h4 className="text-xl font-extrabold text-navy-950">
                  {activeTicket.origin}
                </h4>
                <p className="text-xs font-bold text-saffron-600 mt-0.5">
                  {formatTime12h(activeTicket.departureTime)}
                </p>
                <p className="text-[11px] text-slate-600 mt-1 leading-tight">
                  <MapPin className="w-3 h-3 text-slate-400 inline mr-0.5" />
                  {activeTicket.boardingPoint}
                </p>
              </div>

              <div className="sm:col-span-2 flex flex-col items-center justify-center py-2 sm:py-0">
                <ArrowRight className="w-6 h-6 text-saffron-500 hidden sm:block" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Direct Coach
                </span>
              </div>

              <div className="sm:col-span-5 sm:text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Destination Drop
                </span>
                <h4 className="text-xl font-extrabold text-navy-950">
                  {activeTicket.destination}
                </h4>
                <p className="text-xs font-bold text-saffron-600 mt-0.5">
                  {formatTime12h(activeTicket.arrivalTime)}
                </p>
                <p className="text-[11px] text-slate-600 mt-1 leading-tight">
                  <MapPin className="w-3 h-3 text-slate-400 inline mr-0.5" />
                  {activeTicket.droppingPoint}
                </p>
              </div>

            </div>

            {/* Passenger & Seat Assignment Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-b border-slate-100 pb-5">
              <div>
                <span className="text-slate-400 block font-semibold mb-0.5">Primary Passenger</span>
                <strong className="text-navy-950 font-bold text-sm block">{activeTicket.passengerName}</strong>
                <span className="text-slate-500 text-[11px]">{activeTicket.gender}, {activeTicket.age} yrs</span>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold mb-0.5">Contact Details</span>
                <strong className="text-navy-950 font-bold block">+91 {activeTicket.mobile}</strong>
                <span className="text-slate-500 text-[11px] truncate block">{activeTicket.email || 'N/A'}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold mb-0.5">Assigned Seats</span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {activeTicket.selectedSeats.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-saffron-500 text-white rounded font-black text-xs">
                      Seat {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold mb-0.5">Coach & Type</span>
                <strong className="text-navy-950 font-bold block font-mono text-xs">{activeTicket.busNumber}</strong>
                <span className="text-slate-500 text-[11px]">{activeTicket.busType || 'AC 2+2 Luxury'}</span>
              </div>
            </div>

            {/* Travel Date, Fare & QR Code Footer Area */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              
              <div className="space-y-1 text-xs">
                <p className="text-slate-600">
                  <span>Travel Date: </span>
                  <strong className="text-navy-950 font-bold">{formatDateIndian(activeTicket.travelDate)}</strong>
                </p>
                <p className="text-slate-600">
                  <span>Total Fare Paid: </span>
                  <strong className="text-emerald-700 font-extrabold text-sm">{formatINR(activeTicket.totalFare)}</strong>
                  <span className="text-[11px] text-slate-400 ml-1">({activeTicket.paymentMethod})</span>
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  CONFIRMED (DEMO)
                </div>
              </div>

              {/* Conductor Verification Demo QR Code */}
              <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                <QrCode className="w-14 h-14 text-slate-900" />
                <div className="text-[10px] text-slate-500 leading-tight">
                  <p className="font-bold text-navy-950">Conductor Scan</p>
                  <p>MH Passenger Code</p>
                  <p className="font-mono text-[9px] text-slate-400 mt-0.5">{activeTicket.pnr}</p>
                </div>
              </div>

            </div>

            {/* Reporting Instructions */}
            <div className="bg-amber-50/80 rounded-xl p-3 border border-amber-200/80 text-[11px] text-amber-900 space-y-1">
              <p className="font-bold">Important Travel Guidelines:</p>
              <ul className="list-disc pl-4 space-y-0.5 text-amber-800">
                <li>Please report at {activeTicket.boardingPoint} at least 15 minutes prior to scheduled departure.</li>
                <li>Carry a valid government photo ID card (Aadhaar / Voter ID / Driving License) for conductor verification.</li>
              </ul>
            </div>

          </div>

          {/* Ticket Bottom Stamp */}
          <div className="bg-slate-100 px-6 py-2.5 border-t border-slate-200 text-center text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
            Sahyadri Royal Travels Passenger Copy · Helpline: 020-2553-4400
          </div>

        </div>

        {/* Action Buttons (Excluded from Print via no-print class) */}
        <div className="flex flex-wrap items-center justify-between gap-3 no-print pt-2">
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              Print / Save as PDF
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Summary'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsTicketOpen(false);
                navigateTo('my-bookings');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-saffron-50 border border-saffron-200 text-saffron-800 hover:bg-saffron-100 font-bold text-xs transition-colors"
            >
              View in My Bookings
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setIsTicketOpen(false);
                navigateTo('home');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              Book Another Bus
            </button>
          </div>

        </div>

      </div>
    </Modal>
  );
};

