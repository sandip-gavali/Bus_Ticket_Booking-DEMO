import React from 'react';
import { Bus, ShieldCheck, Heart, Award, Users, CheckCircle2 } from 'lucide-react';

export const AboutUs = () => {
  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> 14 Years of Maharashtra Roadways Excellence
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-950 leading-tight">
              Pioneering Luxury & Pilgrim Bus Travel Across Maharashtra
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              Founded at Swargate, Pune in 2012, <strong>Sahyadri Royal Travels</strong> (सह्याद्री रॉयल ट्रॅव्हल्स) was established with a singular mission: providing the highest standard of comfort, safety, and cultural hospitality to everyday commuters, families, and Warkari pilgrims traveling across Maharashtra.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-navy-950 text-xs">Certified Veteran Drivers</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Average 12+ years driving experience across Sahyadri ghat passes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <Heart className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-navy-950 text-xs">Pilgrim Special Care</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Direct temple approach drops in Pandharpur & Shirdi with luggage assistance.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <Bus className="w-5 h-5 text-saffron-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-navy-950 text-xs">40-Seat Standard Coaches</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Spacious 2+2 pushback recliners with deep leg rests & USB ports.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-navy-950 text-xs">24x7 Pune Control Room</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Live GPS monitoring and roadside mechanic support team on standby.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Stats Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 rounded-3xl p-8 text-white shadow-2xl border border-navy-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-saffron-500/10 rounded-full blur-2xl" />

              <h3 className="text-xl font-extrabold text-white mb-6">
                Maharashtra Fleet By Numbers
              </h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-navy-800 pb-4">
                  <div>
                    <span className="text-3xl font-black text-saffron-400">45+</span>
                    <p className="text-xs text-slate-300">Modern AC Coaches</p>
                  </div>
                  <span className="text-xs text-slate-400">BharatBenz & Volvo</span>
                </div>

                <div className="flex items-center justify-between border-b border-navy-800 pb-4">
                  <div>
                    <span className="text-3xl font-black text-saffron-400">2.4M+</span>
                    <p className="text-xs text-slate-300">Happy Passengers Transported</p>
                  </div>
                  <span className="text-xs text-slate-400">Since 2012</span>
                </div>

                <div className="flex items-center justify-between border-b border-navy-800 pb-4">
                  <div>
                    <span className="text-3xl font-black text-saffron-400">14+</span>
                    <p className="text-xs text-slate-300">Daily Pune-Pandharpur Trips</p>
                  </div>
                  <span className="text-xs text-slate-400">Peak Pilgrim Rush</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-black text-emerald-400">4.85 ★</span>
                    <p className="text-xs text-slate-300">Average Customer Rating</p>
                  </div>
                  <span className="text-xs text-slate-400">Verified Reviews</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

