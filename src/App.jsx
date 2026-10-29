import React, { useState } from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { DemoBanner } from './components/layout/DemoBanner';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/layout/WhatsAppButton';
import { Toast } from './components/common/Toast';

import { SearchSection } from './components/booking/SearchSection';
import { BusList } from './components/booking/BusList';
import { BusSeatLayout } from './components/booking/BusSeatLayout';
import { PassengerForm } from './components/booking/PassengerForm';
import { PaymentModal } from './components/booking/PaymentModal';
import { ETicketModal } from './components/booking/ETicketModal';
import { MyBookingsView } from './components/myBookings/MyBookingsView';
import { AdminDashboard } from './components/admin/AdminDashboard';

import { PopularRoutesSection } from './components/info/PopularRoutesSection';
import { AboutUs } from './components/info/AboutUs';
import { ReviewsSection } from './components/info/ReviewsSection';
import { FAQSection } from './components/info/FAQSection';
import { PolicyModal } from './components/info/PolicyModal';

function MainAppContent() {
  const { currentView } = useBooking();
  const [policyModal, setPolicyModal] = useState({ isOpen: false, type: 'cancellation' });

  const handleOpenPolicies = (type) => {
    setPolicyModal({ isOpen: true, type });
  };

  const handleClosePolicies = () => {
    setPolicyModal({ isOpen: false, type: 'cancellation' });
  };

  const handleSearchSubmit = () => {
    setTimeout(() => {
      const el = document.getElementById('bus-schedules-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-saffron-500 selection:text-white">
      {/* Top Demo Notice Banner */}
      <DemoBanner />

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Dynamic Content Views */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <SearchSection onSearchSubmit={handleSearchSubmit} />
            <BusList />
            <PopularRoutesSection />
            <AboutUs />
            <ReviewsSection />
            <FAQSection />
          </>
        )}

        {currentView === 'seat-selection' && (
          <BusSeatLayout />
        )}

        {currentView === 'passenger-details' && (
          <PassengerForm />
        )}

        {currentView === 'my-bookings' && (
          <MyBookingsView />
        )}

        {currentView === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Global Modals & Overlays */}
      <PaymentModal />
      <ETicketModal />
      <PolicyModal 
        isOpen={policyModal.isOpen} 
        onClose={handleClosePolicies} 
        policyType={policyModal.type} 
      />

      {/* Interactive WhatsApp Demo Floating Widget */}
      <WhatsAppButton />

      {/* Global Notification Toast */}
      <Toast />

      {/* Footer */}
      <Footer onOpenPolicies={handleOpenPolicies} />
    </div>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <MainAppContent />
    </BookingProvider>
  );
}
