import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { SAMPLE_REVIEWS } from '../../data/sampleReviews';

export const ReviewsSection = () => {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-saffron-600 text-saffron-600" /> Traveler Experiences
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
            What Maharashtra Commuters & Pilgrims Say
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Read verified feedback from passengers who frequently book our Pandharpur, Mumbai, Kolhapur, and Shirdi routes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_REVIEWS.map((rev) => (
            <div 
              key={rev.id} 
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Rating & Route */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-md bg-saffron-50 text-saffron-800 text-[11px] font-bold border border-saffron-200">
                  {rev.route}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-navy-950 text-xs">{rev.name}</h4>
                  <span className="text-[10px] text-slate-400">{rev.location}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

