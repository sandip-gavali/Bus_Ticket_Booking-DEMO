import React, { useState } from 'react';
import { 
  CreditCard, 
  QrCode, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  RotateCcw, 
  Lock,
  Sparkles,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Modal } from '../common/Modal';
import { useBooking } from '../../context/BookingContext';
import { formatINR } from '../../utils/formatters';

export const PaymentModal = () => {
  const { 
    isPaymentOpen, 
    setIsPaymentOpen, 
    selectedBus, 
    selectedSeats, 
    passengerDetails, 
    confirmBooking, 
    showToast 
  } = useBooking();

  const [activeTab, setActiveTab] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [isProcessing, setIsProcessing] = useState(false);
  const [failureNotice, setFailureNotice] = useState(null);

  if (!selectedBus) return null;

  const baseFareTotal = selectedSeats.length * selectedBus.baseFare;
  const gstTotal = Math.round(baseFareTotal * 0.05);
  const finalTotal = Math.max(0, baseFareTotal + gstTotal - (passengerDetails.discount || 0));

  const handleSimulateSuccess = () => {
    setIsProcessing(true);
    setFailureNotice(null);

    setTimeout(() => {
      setIsProcessing(false);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // confetti fallback
      }
      const paymentMethodName = 
        activeTab === 'upi' ? 'Simulated UPI (PhonePe / GPay)' :
        activeTab === 'card' ? 'Simulated RuPay Debit Card' : 'Simulated Net Banking';

      confirmBooking({ method: paymentMethodName });
    }, 1200);
  };

  const handleSimulateFailure = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setFailureNotice({
        code: 'SIM_BANK_AUTH_FAILED_09',
        reason: 'Simulated payment rejection: Bank server timeout / insufficient mock balance test.'
      });
      showToast('Payment Simulation: Transaction Failed as requested.', 'error');
    }, 1000);
  };

  return (
    <Modal
      isOpen={isPaymentOpen}
      onClose={() => {
        if (!isProcessing) {
          setIsPaymentOpen(false);
          setFailureNotice(null);
        }
      }}
      title="Simulated Payment Gateway (Demo)"
      subtitle="Complete your bus ticket booking demo without entering real financial data"
      maxWidth="max-w-xl"
    >
      <div className="space-y-5">
        
        {/* Prominent Demo Warning Banner */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-extrabold uppercase tracking-wide text-amber-900">
              Demo Environment — No Real Money Charged
            </h5>
            <p className="leading-relaxed">
              This is a visual mock checkout. <strong>Never enter real card numbers, UPI PINs, or net banking passwords.</strong> Use the buttons below to test both successful booking and failed payment flows.
            </p>
          </div>
        </div>

        {/* Amount to Pay Summary */}
        <div className="bg-navy-950 text-white rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Total Demo Fare
            </span>
            <h4 className="text-xl font-extrabold text-saffron-400">
              {formatINR(finalTotal)}
            </h4>
          </div>
          <div className="text-right text-xs text-slate-300">
            <p className="font-semibold">{selectedBus.origin} → {selectedBus.destination}</p>
            <p className="text-slate-400">{selectedSeats.length} Seat{selectedSeats.length > 1 ? 's' : ''} ({selectedSeats.join(', ')})</p>
          </div>
        </div>

        {/* Failure Error Alert Box (if simulated failure triggered) */}
        {failureNotice && (
          <div className="bg-rose-50 border border-rose-300 rounded-2xl p-4 text-xs text-rose-950 flex items-start gap-3 animate-fade-in">
            <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h5 className="font-bold text-rose-900">Payment Authorization Failed (Simulation)</h5>
              <p className="text-rose-800 mt-0.5">{failureNotice.reason}</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => setFailureNotice(null)}
                  className="px-3 py-1 bg-rose-600 text-white rounded-lg font-bold text-[11px] hover:bg-rose-700 transition-colors inline-flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Retry Payment
                </button>
                <span className="text-[11px] text-rose-700">
                  Your seat selection ({selectedSeats.join(', ')}) is preserved!
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Payment Tabs Selector */}
        <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => { setActiveTab('upi'); setFailureNotice(null); }}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'upi' ? 'bg-white text-navy-950 shadow-sm' : 'hover:text-navy-950'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            UPI / QR Code
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('card'); setFailureNotice(null); }}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'card' ? 'bg-white text-navy-950 shadow-sm' : 'hover:text-navy-950'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            Cards (RuPay/Visa)
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('netbanking'); setFailureNotice(null); }}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'netbanking' ? 'bg-white text-navy-950 shadow-sm' : 'hover:text-navy-950'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Net Banking
          </button>
        </div>

        {/* Tab Content Display (Mock Visuals Only) */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
          {activeTab === 'upi' && (
            <div className="text-center space-y-3">
              <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl border border-slate-300 shadow-sm flex flex-col items-center justify-center">
                <QrCode className="w-28 h-28 text-slate-800" />
                <span className="text-[9px] font-mono font-bold text-slate-400">DEMO QR CODE</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Scan with Google Pay, PhonePe, Paytm, or BHIM UPI
              </p>
              <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-slate-500">
                <span className="px-2 py-1 bg-white rounded border border-slate-200">GPay</span>
                <span className="px-2 py-1 bg-white rounded border border-slate-200">PhonePe</span>
                <span className="px-2 py-1 bg-white rounded border border-slate-200">Paytm</span>
                <span className="px-2 py-1 bg-white rounded border border-slate-200">BHIM</span>
              </div>
            </div>
          )}

          {activeTab === 'card' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 mb-1">Select Demo Test Card:</label>
                <select 
                  defaultValue="rupay" 
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono text-navy-950 focus:outline-none"
                >
                  <option value="rupay">RuPay Platinum (Demo) •••• 4242</option>
                  <option value="visa">Visa Signature (Demo) •••• 8899</option>
                  <option value="master">Mastercard Gold (Demo) •••• 1008</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Expiry (MM/YY):</label>
                  <input 
                    type="text" 
                    disabled 
                    value="12 / 29" 
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono text-slate-500" 
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-1">CVV:</label>
                  <input 
                    type="password" 
                    disabled 
                    value="•••" 
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono text-slate-500" 
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-400 italic">
                * Pre-filled test credentials for demo simulation only.
              </p>
            </div>
          )}

          {activeTab === 'netbanking' && (
            <div className="space-y-3 text-xs">
              <label className="block font-bold text-slate-600 mb-1">Choose Popular Bank:</label>
              <div className="grid grid-cols-2 gap-2">
                {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Bank of Maharashtra', 'Kotak Bank'].map((b, i) => (
                  <div key={i} className="p-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 text-center hover:border-saffron-400 cursor-pointer text-[11px]">
                    {b}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Clear Action Buttons: Simulate Success vs Simulate Failure */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleSimulateSuccess}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Simulate Successful Payment ({formatINR(finalTotal)})</span>
              </>
            )}
          </button>

          <button
            type="button"
            disabled={isProcessing}
            onClick={handleSimulateFailedPayment}
            className="w-full py-2.5 px-4 rounded-xl border border-rose-300 text-rose-700 bg-rose-50/50 hover:bg-rose-100/80 font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>Simulate Failed Payment (Test Error & Retry)</span>
          </button>
        </div>

      </div>
    </Modal>
  );

  function handleSimulateFailedPayment() {
    handleSimulateFailure();
  }
};

