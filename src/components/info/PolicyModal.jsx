import React from 'react';
import { ShieldCheck, Info, FileText, AlertTriangle } from 'lucide-react';
import { Modal } from '../common/Modal';

export const PolicyModal = ({ isOpen, onClose, policyType = 'cancellation' }) => {
  const titles = {
    cancellation: 'Cancellation & Demo Refund Rules',
    terms: 'Terms & Conditions of Carriage',
    privacy: 'Privacy & Data Protection Notice',
    pilgrim: 'Pandharpur & Shirdi Pilgrim Guidelines'
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={titles[policyType] || 'Company Policies'}
      subtitle="Sahyadri Royal Travels · Maharashtra Private Coach Guidelines"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4 text-xs text-slate-600 leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
        
        {/* Important Demo Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-900 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-[11px]">
            <strong>DEMO DISCLAIMER:</strong> This website is an interactive prototype for testing and demonstration purposes. No real bank accounts are credited or debited, and no actual bus transport tickets are issued.
          </p>
        </div>

        {policyType === 'cancellation' && (
          <div className="space-y-3">
            <h4 className="font-bold text-navy-950 text-sm">1. Cancellation Fee Slab (Simulated)</h4>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5 font-medium">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>More than 24 hours prior to departure:</span>
                <strong className="text-emerald-700">10% cancellation charge</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>Between 12 and 24 hours:</span>
                <strong className="text-amber-700">25% cancellation charge</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>Between 2 and 12 hours:</span>
                <strong className="text-rose-700">50% cancellation charge</strong>
              </div>
              <div className="flex justify-between py-1">
                <span>Less than 2 hours or post departure:</span>
                <strong className="text-slate-500">Non-refundable</strong>
              </div>
            </div>

            <h4 className="font-bold text-navy-950 text-sm mt-4">2. Immediate Seat Release Mechanism</h4>
            <p>
              When a user cancels a demo booking under 'My Bookings', the booked seats are immediately unlocked and restored to the active bus schedule so they can be reserved by other users in the demo state.
            </p>

            <h4 className="font-bold text-navy-950 text-sm mt-4">3. Demonstration Refund Processing</h4>
            <p>
              Refund calculations are displayed clearly for educational purposes. In a live production deployment, refunds would be routed back to the original source instrument (UPI / Debit Card / Net Banking) within 3-5 business days.
            </p>
          </div>
        )}

        {policyType === 'terms' && (
          <div className="space-y-3">
            <h4 className="font-bold text-navy-950 text-sm">1. Reporting & Boarding Rules</h4>
            <p>
              Passengers must report at their designated boarding terminal (e.g., Swargate, Dadar TT, or Kawala Naka) at least 15 minutes before the scheduled departure time. Coaches adhere strictly to departure schedules.
            </p>
            <h4 className="font-bold text-navy-950 text-sm">2. Luggage & Belongings</h4>
            <p>
              Each passenger is entitled to 20 kg of checked luggage stored in the lower luggage belly and one standard handbag in the overhead rack. Flammable items, gas cylinders, and hazardous substances are strictly prohibited.
            </p>
            <h4 className="font-bold text-navy-950 text-sm">3. Identification Verification</h4>
            <p>
              A valid government photo identity card (Aadhaar Card, Driving License, or Voter ID) must be presented along with the mobile SMS/E-Ticket upon conductor request.
            </p>
          </div>
        )}

        {policyType === 'privacy' && (
          <div className="space-y-3">
            <h4 className="font-bold text-navy-950 text-sm">1. Local Demo Data Handling</h4>
            <p>
              All sample names, telephone numbers, and email addresses entered on this demo site are stored solely in your local browser’s localStorage. No personal information is transmitted to external servers, sold, or shared with third parties.
            </p>
            <h4 className="font-bold text-navy-950 text-sm">2. Financial Privacy</h4>
            <p>
              We do NOT collect, process, or store credit card numbers, CVVs, UPI PINs, or net banking passwords. The simulated checkout is strictly a frontend UI prototype.
            </p>
          </div>
        )}

        {policyType === 'pilgrim' && (
          <div className="space-y-3">
            <h4 className="font-bold text-navy-950 text-sm">Pandharpur Vithoba Darshan Coach Guidelines</h4>
            <p>
              Our daily Pune to Pandharpur coaches provide special drop-offs near the Vitthal Rukmini Mandir approach gates (Namdev Payatha Road) and Bhakta Niwas math areas. Clean storage for traditional Dindi luggage and pilgrim offerings is provided.
            </p>
            <p>
              During Ashadhi and Kartiki Ekadashi peak periods, extra coaches operate around the clock from Swargate, Pune.
            </p>
          </div>
        )}

        <div className="pt-3 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-navy-900 text-white rounded-xl font-bold"
          >
            I Understand & Close
          </button>
        </div>

      </div>
    </Modal>
  );
};

