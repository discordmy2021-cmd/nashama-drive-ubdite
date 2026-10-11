import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturesRow } from './components/FeaturesRow';
import { PhoneShowcase } from './components/PhoneShowcase';
import { AboutSection } from './components/AboutSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ContactSection } from './components/ContactSection';
import { BottomBar } from './components/BottomBar';
import { BookingModal } from './components/BookingModal';
import { CaptainModal } from './components/CaptainModal';
import { ChatModal } from './components/ChatModal';
import { CallModal } from './components/CallModal';
import { WalletModal } from './components/WalletModal';
import { NotificationsModal } from './components/NotificationsModal';
import { mockDriver } from './data/mockData';

export function App() {
  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCaptainOpen, setIsCaptainOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Active driver data
  const [driver] = useState(mockDriver);

  // Handlers
  const handleOpenAuth = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLearnMore = () => {
    const el = document.getElementById('features-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSwitchToDriver = () => {
    const el = document.getElementById('app-showcase');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRideBooked = (details: { pickup: string; destination: string; carType: string; price: number }) => {
    console.log('Ride booked:', details);
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-white flex flex-col font-['Cairo'] selection:bg-[#E50914] selection:text-white">
      
      {/* 1. Header Navigation Bar */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenCaptainModal={() => setIsCaptainOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 2. Hero Section with Auth Box & Luxury Car Visual */}
        <Hero
          onOpenBooking={() => setIsBookingOpen(true)}
          onLearnMore={handleLearnMore}
        />

        {/* 3. 4 Feature Highlights Grid (Directly under Hero) */}
        <FeaturesRow />

        {/* 4. 5 Smartphone Mockups Showcase on Crimson Red Background */}
        <PhoneShowcase
          driver={driver}
          onOpenChat={() => setIsChatOpen(true)}
          onOpenCall={() => setIsCallOpen(true)}
          onBookRide={() => setIsBookingOpen(true)}
        />

        {/* 5. How It Works Section */}
        <HowItWorksSection onBookNow={() => setIsBookingOpen(true)} />

        {/* 6. About Nashama Section */}
        <AboutSection />

        {/* 7. Contact & FAQs Section */}
        <ContactSection />

      </main>

      {/* 8. Floating Bottom Navigation Bar matching design */}
      <BottomBar
        onOpenCaptainModal={() => setIsCaptainOpen(true)}
        onOpenWalletModal={() => setIsWalletOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onSwitchToDriver={handleSwitchToDriver}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onRideBooked={handleRideBooked}
      />

      <CaptainModal
        isOpen={isCaptainOpen}
        onClose={() => setIsCaptainOpen(false)}
      />

      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        driver={driver}
      />

      <CallModal
        isOpen={isCallOpen}
        onClose={() => setIsCallOpen(false)}
        driver={driver}
      />

      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

    </div>
  );
}

export default App;
