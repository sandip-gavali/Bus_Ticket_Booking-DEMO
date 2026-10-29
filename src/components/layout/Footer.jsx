import React from 'react';
import { Bus, MapPin, Phone, Mail, ShieldAlert, Heart, Clock, Award } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const Footer = ({ onOpenPolicies }) => {
  const { navigateTo, setSearchParams } = useBooking();

  const handleRouteClick = (origin, destination) => {
    setSearchParams(prev => ({
      ...prev,
      origin,
      destination
    }));
    navigateTo('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-navy-900 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 mb-12 border-b border-navy-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-saffron-500/10 border border-saffron-500/20 flex items-center justify-center text-saffron-400">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">45+ Modern Buses</h5>
              <p className="text-xs text-slate-400">BharatBenz & Volvo Air-Suspension</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-saffron-500/10 border border-saffron-500/20 flex items-center justify-center text-saffron-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">98.4% On-Time Departures</h5>
              <p className="text-xs text-slate-400">Strict expressway schedule adherence</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-saffron-500/10 border border-saffron-500/20 flex items-center justify-center text-saffron-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Pilgrim Special Service</h5>
              <p className="text-xs text-slate-400">Special Pandharpur & Shirdi coaches</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-saffron-500/10 border border-saffron-500/20 flex items-center justify-center text-saffron-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Safe & Sanitized Travel</h5>
              <p className="text-xs text-slate-400">CCTV, GPS & trained veteran drivers</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-saffron-500 flex items-center justify-center text-white font-bold">
                <Bus className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white">Sahyadri Royal Travels</span>
                <p className="text-xs text-saffron-400">सह्याद्री रॉयल ट्रॅव्हल्स · महाराष्ट्र</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Connecting Maharashtra’s vibrant commercial hubs and sacred pilgrim centers with premier comfort, safety, and punctual departures since 2012. Specializing in high-frequency Pune-Pandharpur daily routes.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-saffron-400 flex-shrink-0" />
                Headquarters: Sahyadri Hub, Opp. Natraj Hotel, Swargate, Pune - 411042
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-saffron-400 flex-shrink-0" />
                Helpline: +91 20 2553 4400 / +91 98220 11442
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-saffron-400 flex-shrink-0" />
                Inquiry: support@sahyadritravels-demo.in
              </p>
            </div>
          </div>

          {/* Popular Routes */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Top Routes</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => handleRouteClick('Pune', 'Pandharpur')}
                  className="hover:text-saffron-400 transition-colors text-left"
                >
                  Pune → Pandharpur (विठ्ठल दर्शन)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleRouteClick('Pandharpur', 'Pune')}
                  className="hover:text-saffron-400 transition-colors text-left"
                >
                  Pandharpur → Pune Express
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleRouteClick('Mumbai', 'Pune')}
                  className="hover:text-saffron-400 transition-colors text-left"
                >
                  Mumbai → Pune Expressway
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleRouteClick('Pune', 'Kolhapur')}
                  className="hover:text-saffron-400 transition-colors text-left"
                >
                  Pune → Kolhapur (महालक्ष्मी)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleRouteClick('Pune', 'Shirdi')}
                  className="hover:text-saffron-400 transition-colors text-left"
                >
                  Pune → Shirdi (साई दर्शन)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleRouteClick('Mumbai', 'Mahabaleshwar')}
                  className="hover:text-saffron-400 transition-colors text-left"
                >
                  Mumbai → Mahabaleshwar
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Actions</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => navigateTo('home')}
                  className="hover:text-saffron-400 transition-colors text-left"
                >
                  Search Bus Schedules
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('my-bookings')}
                  className="hover:text-saffron-400 transition-colors text-left"
                >
                  Check PNR Status / My Bookings
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('my-bookings')}
                  className="hover:text-saffron-400 transition-colors text-left"
                >
                  Cancel Demo Ticket & Refund Info
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    navigateTo('home');
                    setTimeout(() => {
                      const el = document.getElementById('faq-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-saffron-400 transition-colors text-left"
                >
                  Baggage & Boarding Guidelines
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('admin')}
                  className="hover:text-saffron-400 transition-colors text-left text-saffron-300 font-semibold"
                >
                  Admin Operations Console
                </button>
              </li>
            </ul>
          </div>

          {/* Demo & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Policies & Terms</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => onOpenPolicies && onOpenPolicies('cancellation')} 
                  className="hover:text-saffron-400 transition-colors text-left"
                >
                  Cancellation Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPolicies && onOpenPolicies('terms')} 
                  className="hover:text-saffron-400 transition-colors text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPolicies && onOpenPolicies('privacy')} 
                  className="hover:text-saffron-400 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPolicies && onOpenPolicies('pilgrim')} 
                  className="hover:text-saffron-400 transition-colors text-left"
                >
                  Pilgrim Travel Guidelines
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-semibold">
                Simulated INR (₹) Demo System
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer Notice */}
        <div className="pt-8 border-t border-navy-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center md:text-left">
            <p className="font-semibold text-slate-400">
              © {new Date().getFullYear()} Sahyadri Royal Travels (Private Operator Demo). All rights reserved.
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Strictly a demo prototype with simulated data, bookings, and payments. Not affiliated with real state or private bus operators.
            </p>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <span>Crafted for Maharashtra travelers with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>in Pune, India</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

