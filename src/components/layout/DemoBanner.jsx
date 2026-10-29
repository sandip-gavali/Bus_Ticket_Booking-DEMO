import React from 'react';
import { AlertTriangle, RotateCcw, ShieldAlert, Sparkles } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const DemoBanner = () => {
  const { resetDemoData, navigateTo, currentView, isAdminAuth, setIsAdminAuth } = useBooking();

  return (
    <div className="bg-gradient-to-r from-amber-600 via-saffron-600 to-amber-700 text-white text-xs px-3 sm:px-4 py-2 shadow-inner no-print">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-white/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" /> Demo Mode
          </span>
          <p className="font-medium text-amber-50 hidden sm:inline">
            Simulated booking platform for Maharashtra private bus operations. No real payments or tickets issued.
          </p>
          <p className="font-medium text-amber-50 sm:hidden">
            Demo platform · Simulated booking & payments only
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetDemoData}
            title="Reset demo seats and bookings to default"
            className="inline-flex items-center gap-1 bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors backdrop-blur-sm"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Demo Data
          </button>

          <button
            onClick={() => {
              if (currentView === 'admin') {
                navigateTo('home');
              } else {
                setIsAdminAuth(true);
                navigateTo('admin');
              }
            }}
            className="inline-flex items-center gap-1 bg-navy-950 hover:bg-navy-900 text-white px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors shadow-sm"
          >
            {currentView === 'admin' ? '← Back to Customer Site' : '⚡ Admin Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );
};

