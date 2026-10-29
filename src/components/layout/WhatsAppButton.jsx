import React, { useState } from 'react';
import { MessageSquare, Send, X, Bus, CheckCheck } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('Hello Sahyadri Travels, I want to inquire about Pune to Pandharpur luxury bus schedules and seat booking.');
  const [sentNotice, setSentNotice] = useState(false);
  const { showToast } = useBooking();

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSentNotice(true);
    showToast('Demo WhatsApp inquiry sent to Sahyadri Desk! (Simulated)', 'success');
    
    setTimeout(() => {
      setSentNotice(false);
      setIsOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 no-print whatsapp-float">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in text-slate-800">
          <div className="bg-emerald-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-lg text-white">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Sahyadri Travels Support</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  Online · Maharashtra Desk (Demo)
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-emerald-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-slate-50 space-y-3 max-h-60 overflow-y-auto">
            <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm text-xs text-slate-700 leading-relaxed border border-slate-100">
              <p className="font-semibold text-emerald-800 mb-1">नमस्कार! 🙏 Welcome to Sahyadri Royal Travels.</p>
              <p>How can we help your journey today? Ask for departure times, boarding points in Swargate/Dadar, or Pandharpur temple drops.</p>
              <span className="text-[10px] text-slate-400 block text-right mt-1">Just now</span>
            </div>

            {sentNotice && (
              <div className="bg-emerald-50 text-emerald-900 p-2.5 rounded-xl rounded-tr-none text-xs ml-auto max-w-[85%] border border-emerald-200">
                <p>{message}</p>
                <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-700 mt-1">
                  <span>Delivered</span>
                  <CheckCheck className="w-3 h-3 text-emerald-600" />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl transition-colors shadow-sm"
              title="Simulate sending WhatsApp message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="bg-slate-100 px-3 py-1.5 text-center text-[10px] text-slate-500">
            Demo WhatsApp simulator · No actual chat connection
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 group focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="WhatsApp customer support demo"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 fill-current" />
        </div>
        <span className="text-xs font-bold tracking-wide hidden sm:inline">
          {isOpen ? 'Close Chat' : 'Help & WhatsApp'}
        </span>
      </button>
    </div>
  );
};

