import React from 'react';
import { Compass, Clock, ArrowRight, Bus, Tag, Sparkles } from 'lucide-react';
import { POPULAR_ROUTES } from '../../data/mockData';
import { useBooking } from '../../context/BookingContext';
import { formatINR } from '../../utils/formatters';

export const PopularRoutesSection = () => {
  const { setSearchParams, navigateTo, showToast } = useBooking();

  const handleSelectRoute = (origin, destination) => {
    setSearchParams(prev => ({
      ...prev,
      origin,
      destination
    }));
    navigateTo('home');
    showToast(`Loaded ${origin} to ${destination} schedules`, 'info');
    setTimeout(() => {
      const el = document.getElementById('bus-schedules-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/80" id="popular-routes-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" /> High Frequency Express Corridors
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
            Popular Bus Routes in Maharashtra
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Daily frequent departures connecting major pilgrimage shrines, business centers, and hill stations.
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_ROUTES.map((route, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-saffron-300 transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div className="p-6">
                
                {/* Tag & Frequency */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-navy-50 text-navy-900 border border-navy-100">
                    {route.tag}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {route.busesPerDay} Buses / Day
                  </span>
                </div>

                {/* City Pair */}
                <div className="flex items-center gap-3 my-2">
                  <span className="text-lg font-extrabold text-navy-950 group-hover:text-saffron-600 transition-colors">
                    {route.origin}
                  </span>
                  <div className="flex-1 border-t-2 border-dashed border-slate-200 relative flex items-center justify-center">
                    <Bus className="w-4 h-4 text-saffron-500 bg-white px-0.5" />
                  </div>
                  <span className="text-lg font-extrabold text-navy-950 group-hover:text-saffron-600 transition-colors">
                    {route.destination}
                  </span>
                </div>

                {/* Duration & Highlights */}
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500 py-2 border-t border-b border-slate-100">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-saffron-500" />
                    Approx {route.duration}
                  </span>
                  <span className="font-semibold text-slate-700">
                    2+2 Luxury AC Coaches
                  </span>
                </div>

              </div>

              {/* Bottom Price & Action */}
              <div className="p-6 pt-0 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Fares From
                  </span>
                  <span className="text-xl font-black text-saffron-600">
                    {formatINR(route.startingFare)}
                  </span>
                </div>

                <button
                  onClick={() => handleSelectRoute(route.origin, route.destination)}
                  className="px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-saffron-600 text-white font-bold text-xs transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

