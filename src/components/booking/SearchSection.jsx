import React from 'react';
import { 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRightLeft, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Compass,
  Bus
} from 'lucide-react';
import { CITIES } from '../../data/mockData';
import { useBooking } from '../../context/BookingContext';
import { formatDateIndian } from '../../utils/formatters';

export const SearchSection = ({ onSearchSubmit }) => {
  const { searchParams, setSearchParams, showToast } = useBooking();

  const handleSwap = () => {
    setSearchParams(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
    showToast(`Swapped route: ${searchParams.destination} → ${searchParams.origin}`, 'info');
  };

  const handleQuickDate = (daysAhead) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    const dateStr = d.toISOString().split('T')[0];
    setSearchParams(prev => ({ ...prev, travelDate: dateStr }));
  };

  const isToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return searchParams.travelDate === today;
  };

  const isTomorrow = () => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return searchParams.travelDate === t.toISOString().split('T')[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchParams.origin === searchParams.destination) {
      showToast('Origin and Destination cannot be the same city!', 'warning');
      return;
    }
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-navy-800 overflow-hidden">
      
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-saffron-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-6xl mx-auto">
        
        {/* Hero Tagline */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-500/15 border border-saffron-500/30 text-saffron-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Maharashtra's Premier Bus Network
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Seamless & Comfortable <span className="text-saffron-400">Bus Journeys</span> in Maharashtra
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Book 40-seat luxury BharatBenz & Volvo coaches for Pune, Pandharpur, Mumbai, Kolhapur, and Shirdi with real-time seat mapping.
          </p>
        </div>

        {/* Search Booking Box Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 text-slate-800 border border-slate-100 transition-all">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Grid of Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
              
              {/* Origin Field */}
              <div className="md:col-span-4 relative">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-saffron-600" />
                  Leaving From
                </label>
                <div className="relative">
                  <select
                    value={searchParams.origin}
                    onChange={(e) => setSearchParams({ ...searchParams, origin: e.target.value })}
                    className="w-full pl-3 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-navy-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-all cursor-pointer"
                  >
                    {CITIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} ({c.state})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button (Desktop & Mobile) */}
              <div className="md:col-span-1 flex justify-center -my-2 md:my-0">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-saffron-50 hover:text-saffron-600 border border-slate-200 flex items-center justify-center text-slate-600 transition-all shadow-sm hover:rotate-180 duration-300 focus:outline-none focus:ring-2 focus:ring-saffron-400"
                  title="Swap Origin and Destination"
                  aria-label="Swap Origin and Destination"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Destination Field */}
              <div className="md:col-span-4 relative">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  Going To
                </label>
                <div className="relative">
                  <select
                    value={searchParams.destination}
                    onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                    className="w-full pl-3 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-navy-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-all cursor-pointer"
                  >
                    {CITIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} ({c.state})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Travel Date */}
              <div className="md:col-span-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-navy-700" />
                  Journey Date
                </label>
                <input
                  type="date"
                  value={searchParams.travelDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSearchParams({ ...searchParams, travelDate: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-navy-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-saffron-500 transition-all cursor-pointer"
                />
              </div>

            </div>

            {/* Quick Date Chips & Passengers Selector Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100">
              
              {/* Quick Date Shortcuts */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mr-1">
                  Quick Date:
                </span>
                <button
                  type="button"
                  onClick={() => handleQuickDate(0)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    isToday()
                      ? 'bg-navy-900 text-white border-navy-900 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDate(1)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    isTomorrow()
                      ? 'bg-navy-900 text-white border-navy-900 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDate(2)}
                  className="px-3 py-1 rounded-lg text-xs font-semibold border bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 transition-all"
                >
                  Day After
                </button>
              </div>

              {/* Passengers Count Selector */}
              <div className="flex items-center gap-3 justify-between sm:justify-end">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-600">Passengers:</span>
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                    <button
                      type="button"
                      onClick={() => setSearchParams(prev => ({
                        ...prev,
                        passengerCount: Math.max(1, prev.passengerCount - 1)
                      }))}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-navy-950">
                      {searchParams.passengerCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSearchParams(prev => ({
                        ...prev,
                        passengerCount: Math.min(6, prev.passengerCount + 1)
                      }))}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Primary Search Button */}
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-saffron-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-saffron-300"
                >
                  <Search className="w-4 h-4" />
                  Search Buses
                </button>
              </div>

            </div>

          </form>
        </div>

        {/* Quick Popular Corridor Chips */}
        <div className="mt-6 flex items-center gap-2 flex-wrap justify-center text-xs text-slate-300">
          <span className="font-semibold text-slate-400 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-saffron-400" /> Popular Routes:
          </span>
          <button
            onClick={() => {
              setSearchParams(prev => ({ ...prev, origin: 'Pune', destination: 'Pandharpur' }));
              if (onSearchSubmit) onSearchSubmit();
            }}
            className="px-3 py-1 rounded-full bg-navy-800/80 hover:bg-saffron-500 hover:text-white border border-navy-700 transition-colors text-slate-200 font-medium"
          >
            Pune → Pandharpur (विठ्ठल दर्शन)
          </button>

          <button
            onClick={() => {
              setSearchParams(prev => ({ ...prev, origin: 'Pandharpur', destination: 'Pune' }));
              if (onSearchSubmit) onSearchSubmit();
            }}
            className="px-3 py-1 rounded-full bg-navy-800/80 hover:bg-saffron-500 hover:text-white border border-navy-700 transition-colors text-slate-200 font-medium"
          >
            Pandharpur → Pune
          </button>

          <button
            onClick={() => {
              setSearchParams(prev => ({ ...prev, origin: 'Mumbai', destination: 'Pune' }));
              if (onSearchSubmit) onSearchSubmit();
            }}
            className="px-3 py-1 rounded-full bg-navy-800/80 hover:bg-saffron-500 hover:text-white border border-navy-700 transition-colors text-slate-200 font-medium"
          >
            Mumbai → Pune Expressway
          </button>

          <button
            onClick={() => {
              setSearchParams(prev => ({ ...prev, origin: 'Pune', destination: 'Kolhapur' }));
              if (onSearchSubmit) onSearchSubmit();
            }}
            className="px-3 py-1 rounded-full bg-navy-800/80 hover:bg-saffron-500 hover:text-white border border-navy-700 transition-colors text-slate-200 font-medium"
          >
            Pune → Kolhapur
          </button>
        </div>

      </div>
    </div>
  );
};

