import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Tag, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  CreditCard,
  ChevronRight,
  Info
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { CITIES, VALID_COUPONS } from '../../data/mockData';
import { formatINR, formatTime12h, formatDateIndian } from '../../utils/formatters';

export const PassengerForm = () => {
  const { 
    selectedBus, 
    selectedSeats, 
    passengerDetails, 
    setPassengerDetails, 
    searchParams, 
    navigateTo, 
    setIsPaymentOpen, 
    showToast 
  } = useBooking();

  const [errors, setErrors] = useState({});
  const [couponInput, setCouponInput] = useState(passengerDetails.couponCode || '');
  const [couponSuccessMsg, setCouponSuccessMsg] = useState(
    passengerDetails.couponCode ? `Coupon ${passengerDetails.couponCode} applied!` : ''
  );

  if (!selectedBus) {
    navigateTo('home');
    return null;
  }

  // Get origin & destination city boarding/dropping stops
  const originCity = CITIES.find(c => c.name.toLowerCase() === selectedBus.origin.toLowerCase());
  const destCity = CITIES.find(c => c.name.toLowerCase() === selectedBus.destination.toLowerCase());

  const boardingOptions = originCity?.boardingPoints || [
    { name: `${selectedBus.origin} Main Stand`, landmark: 'Central Depot' }
  ];
  const droppingOptions = destCity?.droppingPoints || [
    { name: `${selectedBus.destination} Main Stand`, landmark: 'Central Terminal' }
  ];

  // Set initial boarding/dropping points if not set
  if (!passengerDetails.boardingPoint && boardingOptions.length > 0) {
    setPassengerDetails(prev => ({
      ...prev,
      boardingPoint: boardingOptions[0].name
    }));
  }
  if (!passengerDetails.droppingPoint && droppingOptions.length > 0) {
    setPassengerDetails(prev => ({
      ...prev,
      droppingPoint: droppingOptions[0].name
    }));
  }

  const baseFareTotal = selectedSeats.length * selectedBus.baseFare;
  const gstTotal = Math.round(baseFareTotal * 0.05);
  const discountTotal = passengerDetails.discount || 0;
  const finalTotal = Math.max(0, baseFareTotal + gstTotal - discountTotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    const coupon = VALID_COUPONS[code];
    if (!coupon) {
      showToast('Invalid promo code. Try "MAHA50" or "FIRSTTRIP".', 'error');
      setCouponSuccessMsg('');
      return;
    }

    if (coupon.minFare && baseFareTotal < coupon.minFare) {
      showToast(`This coupon requires a minimum fare of ₹${coupon.minFare}.`, 'warning');
      return;
    }

    let discount = 0;
    if (coupon.discount) {
      discount = coupon.discount;
    } else if (coupon.percentage) {
      discount = Math.min(coupon.maxDiscount, Math.round((baseFareTotal * coupon.percentage) / 100));
    }

    setPassengerDetails(prev => ({
      ...prev,
      couponCode: code,
      discount
    }));

    setCouponSuccessMsg(`Promo Code ${code} applied! Saved ₹${discount}`);
    showToast(`Promo Code Applied! ₹${discount} discount added.`, 'success');
  };

  const handleRemoveCoupon = () => {
    setPassengerDetails(prev => ({
      ...prev,
      couponCode: '',
      discount: 0
    }));
    setCouponInput('');
    setCouponSuccessMsg('');
    showToast('Promo code removed', 'info');
  };

  const validate = () => {
    const errs = {};

    if (!passengerDetails.name || passengerDetails.name.trim().length < 3) {
      errs.name = 'Please enter a valid passenger name (at least 3 characters)';
    }

    // Indian 10-digit mobile check (starts with 6, 7, 8, 9)
    const phoneClean = (passengerDetails.mobile || '').replace(/\D/g, '');
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneClean)) {
      errs.mobile = 'Enter a valid 10-digit Indian mobile number (e.g. 9822019842)';
    }

    // Email format validation if entered
    if (passengerDetails.email && passengerDetails.email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(passengerDetails.email.trim())) {
        errs.email = 'Please enter a valid email address';
      }
    }

    if (!passengerDetails.boardingPoint) {
      errs.boardingPoint = 'Please select a boarding point';
    }

    if (!passengerDetails.droppingPoint) {
      errs.droppingPoint = 'Please select a dropping point';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsPaymentOpen(true);
    } else {
      showToast('Please fix the highlighted errors before proceeding.', 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateTo('seat-selection')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-navy-950 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" />
          Back to Seat Layout
        </button>

        <span className="text-xs font-bold text-slate-500">
          Step 2 of 3: Passenger & Boarding Details
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Details */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
          <h2 className="text-lg sm:text-xl font-extrabold text-navy-950 mb-1 flex items-center gap-2">
            <User className="w-5 h-5 text-saffron-600" />
            Passenger Information
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Ticket details and demo boarding updates will be sent to this contact.
          </p>

          <form onSubmit={handleProceedToPayment} className="space-y-5">
            
            {/* Primary Passenger Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Ramesh V. Kulkarni"
                  value={passengerDetails.name}
                  onChange={(e) => setPassengerDetails({ ...passengerDetails, name: e.target.value })}
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm font-semibold text-navy-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-saffron-500 transition-all ${
                    errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                </p>
              )}
            </div>

            {/* Gender and Age Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Gender <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Male', 'Female', 'Other'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setPassengerDetails({ ...passengerDetails, gender: g })}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        passengerDetails.gender === g
                          ? 'bg-navy-900 text-white border-navy-900 shadow-sm'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Age (Years)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 36"
                  min="1"
                  max="110"
                  value={passengerDetails.age}
                  onChange={(e) => setPassengerDetails({ ...passengerDetails, age: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-navy-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-saffron-500 transition-all"
                />
              </div>
            </div>

            {/* Mobile Number & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-600 text-xs font-bold">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength="10"
                    placeholder="9822019842"
                    value={passengerDetails.mobile}
                    onChange={(e) => setPassengerDetails({ ...passengerDetails, mobile: e.target.value })}
                    className={`flex-1 px-4 py-3 bg-slate-50 border rounded-r-xl text-sm font-semibold text-navy-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-saffron-500 transition-all ${
                      errors.mobile ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.mobile && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.mobile}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="ramesh@example.com"
                  value={passengerDetails.email}
                  onChange={(e) => setPassengerDetails({ ...passengerDetails, email: e.target.value })}
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm font-semibold text-navy-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-saffron-500 transition-all ${
                    errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Boarding and Dropping Points */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-saffron-600" />
                Select Boarding & Dropping Points
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Boarding Point in {selectedBus.origin}:
                </label>
                <select
                  value={passengerDetails.boardingPoint}
                  onChange={(e) => setPassengerDetails({ ...passengerDetails, boardingPoint: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-navy-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-saffron-500"
                >
                  {boardingOptions.map((b, i) => (
                    <option key={i} value={b.name}>
                      {b.name} ({b.landmark})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dropping Point in {selectedBus.destination}:
                </label>
                <select
                  value={passengerDetails.droppingPoint}
                  onChange={(e) => setPassengerDetails({ ...passengerDetails, droppingPoint: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-navy-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-saffron-500"
                >
                  {droppingOptions.map((d, i) => (
                    <option key={i} value={d.name}>
                      {d.name} ({d.landmark})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Promo Code Box */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-saffron-600" />
                Have a Demo Promo Code?
              </label>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Try: MAHA50 or FIRSTTRIP"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold uppercase focus:bg-white focus:outline-none focus:ring-2 focus:ring-saffron-500"
                />
                {passengerDetails.couponCode ? (
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-5 py-2 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                  >
                    Apply
                  </button>
                )}
              </div>

              {couponSuccessMsg && (
                <p className="text-xs font-semibold text-emerald-600 mt-1.5 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> {couponSuccessMsg}
                </p>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-extrabold text-base shadow-xl shadow-saffron-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <CreditCard className="w-5 h-5" />
                <span>Proceed to Simulated Payment ({formatINR(finalTotal)})</span>
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Demo checkout · Zero real money charged
              </p>
            </div>

          </form>
        </div>

        {/* Right Column: Journey Summary & Cancellation Policy Card */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Journey Summary Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
            <h3 className="font-extrabold text-navy-950 text-base mb-4 pb-3 border-b border-slate-100">
              Journey Summary
            </h3>

            <div className="space-y-3 text-xs mb-6">
              <div className="flex justify-between">
                <span className="text-slate-500">Bus Operator:</span>
                <span className="font-bold text-navy-950">Sahyadri Royal Travels</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Bus Name:</span>
                <span className="font-bold text-navy-950 text-right">{selectedBus.busName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Route:</span>
                <span className="font-bold text-navy-950">{selectedBus.origin} → {selectedBus.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Travel Date:</span>
                <span className="font-bold text-navy-950">{formatDateIndian(searchParams.travelDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Departure Time:</span>
                <span className="font-bold text-navy-950">{formatTime12h(selectedBus.departureTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Seats:</span>
                <span className="font-extrabold text-saffron-600">
                  {selectedSeats.join(', ')} ({selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''})
                </span>
              </div>
            </div>

            {/* Fare Breakdown */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Fare ({selectedSeats.length} seats):</span>
                <span className="font-semibold text-navy-950">{formatINR(baseFareTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (5%):</span>
                <span className="font-semibold text-navy-950">{formatINR(gstTotal)}</span>
              </div>
              {discountTotal > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Promo Discount ({passengerDetails.couponCode}):</span>
                  <span>- {formatINR(discountTotal)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-navy-950 pt-2 border-t border-slate-200">
                <span>Total Amount:</span>
                <span className="text-saffron-600 text-lg font-black">{formatINR(finalTotal)}</span>
              </div>
            </div>
          </div>

          {/* Cancellation Policy Summary Box */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 text-xs">
            <h4 className="font-bold text-navy-950 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600" />
              Demo Cancellation Policy Summary
            </h4>
            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span>Before 24 hours of departure:</span>
                <strong className="text-emerald-700 font-bold">10% deduction</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span>Between 12 to 24 hours:</span>
                <strong className="text-amber-700 font-bold">25% deduction</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span>Between 2 to 12 hours:</span>
                <strong className="text-rose-700 font-bold">50% deduction</strong>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Under 2 hours / Post departure:</span>
                <strong className="text-slate-500 font-bold">No demo refund</strong>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 italic">
              * Note: Demonstrates automatic seat release logic. No real financial refunds occur.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

