import React, { useState } from 'react';
import { 
  Bus, 
  Ticket, 
  ShieldCheck, 
  Phone, 
  Menu, 
  X, 
  UserCheck, 
  Search, 
  Compass, 
  HelpCircle,
  Clock
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const Navbar = () => {
  const { currentView, navigateTo, bookings } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeBookingsCount = bookings.filter(b => b.status === 'CONFIRMED').length;

  const handleNav = (view) => {
    navigateTo(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-navy-950/95 backdrop-blur-md border-b border-navy-800 text-white shadow-md no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-saffron-500 to-saffron-600 flex items-center justify-center shadow-lg shadow-saffron-600/30 group-hover:scale-105 transition-transform">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-saffron-400 transition-colors">
                  Sahyadri Royal
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-saffron-500/20 text-saffron-400 border border-saffron-500/30 uppercase tracking-widest hidden xs:inline-block">
                  Travels
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide flex items-center gap-1">
                <span className="text-saffron-400">सह्याद्री ट्रॅव्हल्स</span> · Maharashtra Express
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'home' 
                  ? 'bg-navy-800 text-saffron-400 shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-navy-900'
              }`}
            >
              <Search className="w-4 h-4" />
              Book Tickets
            </button>

            <button
              onClick={() => handleNav('my-bookings')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 relative ${
                currentView === 'my-bookings' 
                  ? 'bg-navy-800 text-saffron-400 shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-navy-900'
              }`}
            >
              <Ticket className="w-4 h-4" />
              My Bookings
              {activeBookingsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-saffron-500 text-white rounded-full text-[10px] font-bold">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                handleNav('home');
                setTimeout(() => {
                  const el = document.getElementById('popular-routes-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-navy-900 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-saffron-400" />
              Routes
            </button>

            <button
              onClick={() => {
                handleNav('home');
                setTimeout(() => {
                  const el = document.getElementById('faq-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-navy-900 transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              Help & FAQs
            </button>
          </nav>

          {/* Right Header Quick Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 pl-3 border-l border-navy-800 text-xs text-slate-300">
              <div className="w-8 h-8 rounded-full bg-saffron-500/10 border border-saffron-500/20 flex items-center justify-center text-saffron-400">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">24x7 Pune Helpline</p>
                <a href="tel:02025534400" className="font-semibold text-white hover:text-saffron-400 transition-colors">
                  020-2553-4400
                </a>
              </div>
            </div>

            <button
              onClick={() => handleNav('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                currentView === 'admin'
                  ? 'bg-saffron-500 text-white border-saffron-500 shadow-md'
                  : 'bg-navy-900/80 text-slate-200 border-navy-700 hover:bg-navy-800 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-saffron-400" />
              Admin Portal
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNav('my-bookings')}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-900 relative"
              aria-label="My bookings"
            >
              <Ticket className="w-5 h-5" />
              {activeBookingsCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-saffron-500 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-navy-800 bg-navy-950 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-fade-in">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 ${
              currentView === 'home' ? 'bg-navy-800 text-saffron-400' : 'text-slate-200 hover:bg-navy-900'
            }`}
          >
            <Search className="w-5 h-5 text-saffron-400" />
            Search Buses (Pune, Pandharpur, Mumbai...)
          </button>

          <button
            onClick={() => handleNav('my-bookings')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between ${
              currentView === 'my-bookings' ? 'bg-navy-800 text-saffron-400' : 'text-slate-200 hover:bg-navy-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Ticket className="w-5 h-5 text-saffron-400" />
              My Bookings & Tickets
            </div>
            {activeBookingsCount > 0 && (
              <span className="px-2 py-0.5 bg-saffron-500 text-white rounded-full text-xs font-bold">
                {activeBookingsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              handleNav('home');
              setTimeout(() => {
                const el = document.getElementById('popular-routes-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-navy-900 flex items-center gap-3"
          >
            <Compass className="w-5 h-5 text-saffron-400" />
            Popular Maharashtra Routes
          </button>

          <button
            onClick={() => {
              handleNav('home');
              setTimeout(() => {
                const el = document.getElementById('faq-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-navy-900 flex items-center gap-3"
          >
            <HelpCircle className="w-5 h-5 text-slate-400" />
            Help, Luggage & Cancellation Rules
          </button>

          <button
            onClick={() => handleNav('admin')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 border ${
              currentView === 'admin' ? 'bg-saffron-600 text-white border-saffron-500' : 'bg-navy-900 text-slate-100 border-navy-700'
            }`}
          >
            <UserCheck className="w-5 h-5 text-saffron-300" />
            Admin Console (Demo View)
          </button>

          <div className="pt-3 border-t border-navy-800 flex items-center justify-between text-xs text-slate-400 px-2">
            <span>Customer Care: 020-2553-4400</span>
            <span className="text-saffron-400">Swargate, Pune</span>
          </div>
        </div>
      )}
    </header>
  );
};

