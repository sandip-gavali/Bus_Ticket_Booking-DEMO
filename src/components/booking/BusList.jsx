import React, { useState, useMemo } from 'react';
import { 
  Bus, 
  Clock, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Wifi, 
  Zap, 
  Coffee, 
  SlidersHorizontal, 
  Sparkles,
  ChevronRight,
  MapPin,
  Tag
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { formatINR, formatTime12h, formatDateIndian } from '../../utils/formatters';
import { EmptyState } from '../common/EmptyState';

export const BusList = () => {
  const { buses, searchParams, setSearchParams, startSeatSelection } = useBooking();

  const [sortBy, setSortBy] = useState('departure'); // 'departure' | 'price-asc' | 'price-desc' | 'seats'
  const [filterType, setFilterType] = useState('all'); // 'all' | 'ac' | 'volvo'
  const [timeFilter, setTimeFilter] = useState('all'); // 'all' | 'morning' | 'afternoon' | 'night'

  // Filter buses by matching origin and destination
  const filteredBuses = useMemo(() => {
    return buses.filter(bus => {
      const matchRoute = 
        bus.origin.toLowerCase() === searchParams.origin.toLowerCase() &&
        bus.destination.toLowerCase() === searchParams.destination.toLowerCase();

      if (!matchRoute) return false;

      // Filter by type
      if (filterType === 'volvo' && !bus.busName.toLowerCase().includes('volvo')) {
        return false;
      }
      if (filterType === 'ac' && !bus.busType.toLowerCase().includes('ac')) {
        return false;
      }

      // Filter by time of day
      if (timeFilter !== 'all') {
        const hour = parseInt(bus.departureTime.split(':')[0], 10);
        if (timeFilter === 'morning' && (hour < 6 || hour >= 12)) return false;
        if (timeFilter === 'afternoon' && (hour < 12 || hour >= 18)) return false;
        if (timeFilter === 'night' && (hour >= 6 && hour < 18)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'departure') {
        return a.departureTime.localeCompare(b.departureTime);
      }
      if (sortBy === 'price-asc') {
        return a.baseFare - b.baseFare;
      }
      if (sortBy === 'price-desc') {
        return b.baseFare - a.baseFare;
      }
      if (sortBy === 'seats') {
        const aAvail = a.totalSeats - a.bookedSeats.length;
        const bAvail = b.totalSeats - b.bookedSeats.length;
        return bAvail - aAvail;
      }
      return 0;
    });
  }, [buses, searchParams.origin, searchParams.destination, sortBy, filterType, timeFilter]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="bus-schedules-section">
      
      {/* Route and Date Summary Strip */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-navy-950 font-extrabold text-lg sm:text-xl">
            <span>{searchParams.origin}</span>
            <ArrowRight className="w-5 h-5 text-saffron-500" />
            <span>{searchParams.destination}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-2">
            <span>Travel Date: <strong>{formatDateIndian(searchParams.travelDate)}</strong></span>
            <span>·</span>
            <span>{filteredBuses.length} Luxury Coach{filteredBuses.length === 1 ? '' : 'es'} Available</span>
          </p>
        </div>

        {/* Quick Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-xs font-bold text-navy-950 focus:outline-none cursor-pointer"
            >
              <option value="departure">Departure Time (Early First)</option>
              <option value="price-asc">Price (Lowest First)</option>
              <option value="price-desc">Price (Highest First)</option>
              <option value="seats">Seats Available</option>
            </select>
          </div>

          {/* Time Filter */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setTimeFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                timeFilter === 'all' ? 'bg-white text-navy-950 shadow-sm' : 'text-slate-600 hover:text-navy-950'
              }`}
            >
              All Day
            </button>
            <button
              onClick={() => setTimeFilter('morning')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                timeFilter === 'morning' ? 'bg-white text-navy-950 shadow-sm' : 'text-slate-600 hover:text-navy-950'
              }`}
            >
              Morning
            </button>
            <button
              onClick={() => setTimeFilter('night')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                timeFilter === 'night' ? 'bg-white text-navy-950 shadow-sm' : 'text-slate-600 hover:text-navy-950'
              }`}
            >
              Night
            </button>
          </div>
        </div>
      </div>

      {/* Bus Cards List */}
      {filteredBuses.length > 0 ? (
        <div className="space-y-4">
          {filteredBuses.map((bus) => {
            const availableSeatsCount = bus.totalSeats - bus.bookedSeats.length;
            const isAlmostFull = availableSeatsCount <= 10;

            return (
              <div 
                key={bus.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-saffron-300 hover:shadow-lg transition-all overflow-hidden group"
              >
                <div className="p-4 sm:p-6">
                  
                  {/* Top Bus Name & Badge Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center font-bold">
                        <Bus className="w-5 h-5 text-navy-700" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-extrabold text-navy-950 text-base sm:text-lg group-hover:text-saffron-600 transition-colors">
                            {bus.busName}
                          </h3>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono">
                            {bus.busNumber}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          {bus.busType} · 40 Seats (2+2 Layout)
                        </p>
                      </div>
                    </div>

                    {/* Rating badge */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-1 rounded-lg text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                        <span>{bus.rating}</span>
                        <span className="text-emerald-600/70 text-[10px]">({bus.reviewsCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Timings, Route & Pricing Middle Grid */}
                  <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    
                    {/* Departure & Arrival Journey Visual */}
                    <div className="md:col-span-7 flex items-center justify-between sm:justify-start sm:gap-8">
                      {/* Departure */}
                      <div>
                        <span className="text-xl sm:text-2xl font-black text-navy-950 block">
                          {formatTime12h(bus.departureTime)}
                        </span>
                        <span className="text-xs font-bold text-slate-700 block">
                          {bus.origin}
                        </span>
                        <span className="text-[11px] text-slate-400 block max-w-[140px] truncate" title="Boarding at designated Sahyadri lounge">
                          Swargate / Main Hub
                        </span>
                      </div>

                      {/* Journey Duration Bar */}
                      <div className="flex flex-col items-center px-2">
                        <span className="text-[11px] font-bold text-slate-500 mb-1 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-saffron-500" />
                          {bus.duration}
                        </span>
                        <div className="w-24 sm:w-32 h-0.5 bg-slate-200 relative flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-saffron-500 absolute left-0" />
                          <Bus className="w-3.5 h-3.5 text-saffron-600 bg-white" />
                          <div className="w-2 h-2 rounded-full bg-emerald-600 absolute right-0" />
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                          Non-Stop
                        </span>
                      </div>

                      {/* Arrival */}
                      <div>
                        <span className="text-xl sm:text-2xl font-black text-navy-950 block">
                          {formatTime12h(bus.arrivalTime)}
                        </span>
                        <span className="text-xs font-bold text-slate-700 block">
                          {bus.destination}
                        </span>
                        <span className="text-[11px] text-slate-400 block max-w-[140px] truncate" title="Direct drop point">
                          Central Terminal
                        </span>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="md:col-span-5 flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                      <div className="text-left md:text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                          Starting From
                        </span>
                        <div className="flex items-baseline gap-1 md:justify-end">
                          <span className="text-2xl sm:text-3xl font-black text-saffron-600">
                            {formatINR(bus.baseFare)}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">/ seat</span>
                        </div>
                        <div className="mt-1">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            isAlmostFull 
                              ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isAlmostFull ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                            {availableSeatsCount} Seats Left (40 Coach)
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => startSeatSelection(bus)}
                        className="px-5 py-3 rounded-xl bg-navy-950 hover:bg-navy-900 active:bg-black text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 group-hover:bg-saffron-600 focus:outline-none focus:ring-4 focus:ring-saffron-200"
                      >
                        <span>Select Seats</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </div>

                  {/* Amenities Bottom Strip */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-3 flex-wrap">
                      {(bus.amenities || []).map((amenity, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
                          {amenity.includes('WiFi') && <Wifi className="w-3 h-3 text-blue-500" />}
                          {amenity.includes('USB') && <Zap className="w-3 h-3 text-amber-500" />}
                          {amenity.includes('Water') && <Coffee className="w-3 h-3 text-cyan-500" />}
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Conductor: {bus.conductorContact || '+91 98220 11442'}
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title={`No Direct Buses Found for ${searchParams.origin} → ${searchParams.destination}`}
          description={`We currently operate our premier 40-seat coach fleet on popular Maharashtra corridors like Pune ↔ Pandharpur, Mumbai ↔ Pune, and Pune ↔ Kolhapur.`}
          actionLabel="Show Pune → Pandharpur Buses"
          onAction={() => {
            setSearchParams(prev => ({
              ...prev,
              origin: 'Pune',
              destination: 'Pandharpur'
            }));
          }}
        />
      )}

    </div>
  );
};

