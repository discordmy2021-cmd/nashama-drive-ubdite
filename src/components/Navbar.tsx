import React, { useState } from 'react';
import { Logo } from './Logo';
import { Menu, X, User, Car } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenBooking: () => void;
  onOpenCaptainModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenBooking,
  onOpenCaptainModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#09090c]/90 backdrop-blur-md border-b border-zinc-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Right: Brand Logo (RTL layout) */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo size="md" showSlogan={false} />
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-8 text-sm font-semibold">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[#E50914] transition-colors relative py-1 hover:text-red-400"
            >
              الرئيسية
              <span className="absolute bottom-0 right-0 w-full h-0.5 bg-[#E50914] rounded-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('about-section')}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              عنا
            </button>
            <button
              onClick={() => scrollToSection('features-section')}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              مميزاتنا
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              كيف يعمل؟
            </button>
            <button
              onClick={() => scrollToSection('app-showcase')}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              تطبيق السائق
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              تواصل معنا
            </button>
          </nav>

          {/* Left: Action CTA Buttons (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenCaptainModal}
              className="flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-white px-3.5 py-2 rounded-full border border-zinc-700/80 hover:border-zinc-500 bg-zinc-900/60 transition-all cursor-pointer"
            >
              <Car className="w-3.5 h-3.5 text-[#E50914]" />
              <span>انضم ككابتن</span>
            </button>

            <button
              onClick={() => onOpenAuth('login')}
              className="flex items-center gap-2 bg-[#E50914] hover:bg-[#c90812] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:shadow-[0_0_25px_rgba(229,9,20,0.6)] transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <User className="w-4 h-4" />
              <span>غرفة حساب</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenAuth('login')}
              className="bg-[#E50914] text-white px-3 py-1.5 rounded-full text-xs font-bold"
            >
              حساب
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e0e12] border-b border-zinc-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2 text-sm font-semibold">
            <button
              onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-right py-2 text-[#E50914] border-b border-zinc-800/50"
            >
              الرئيسية
            </button>
            <button
              onClick={() => scrollToSection('about-section')}
              className="text-right py-2 text-zinc-300 hover:text-white border-b border-zinc-800/50"
            >
              عنا
            </button>
            <button
              onClick={() => scrollToSection('features-section')}
              className="text-right py-2 text-zinc-300 hover:text-white border-b border-zinc-800/50"
            >
              مميزاتنا
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-right py-2 text-zinc-300 hover:text-white border-b border-zinc-800/50"
            >
              كيف يعمل؟
            </button>
            <button
              onClick={() => scrollToSection('app-showcase')}
              className="text-right py-2 text-zinc-300 hover:text-white border-b border-zinc-800/50"
            >
              تطبيق السائق وشاشات العمل
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className="text-right py-2 text-zinc-300 hover:text-white"
            >
              تواصل معنا
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="w-full bg-[#E50914] text-white py-2.5 rounded-full font-bold text-center text-sm shadow-lg"
            >
              اطلب رحلة الآن
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenCaptainModal(); }}
              className="w-full bg-zinc-800 text-zinc-200 hover:text-white py-2.5 rounded-full font-semibold text-center text-sm border border-zinc-700"
            >
              التسجيل ككابتن نشاما
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
