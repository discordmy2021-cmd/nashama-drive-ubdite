import React from 'react';
import { Logo } from './Logo';
import { Bell, Wallet, Car, ChevronLeft } from 'lucide-react';

interface BottomBarProps {
  onOpenCaptainModal: () => void;
  onOpenWalletModal: () => void;
  onOpenNotifications: () => void;
  onSwitchToDriver: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  onOpenCaptainModal,
  onOpenWalletModal,
  onOpenNotifications,
  onSwitchToDriver
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#09090c]/95 border-t border-zinc-800/90 backdrop-blur-xl py-3 px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Right (RTL): Prominent Captain Register Button */}
        <div className="flex-shrink-0">
          <button
            onClick={onOpenCaptainModal}
            className="group flex items-center gap-2.5 bg-[#E50914] hover:bg-[#c90812] text-white px-5 sm:px-7 py-3 rounded-full font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(229,9,20,0.6)] hover:shadow-[0_0_35px_rgba(229,9,20,0.8)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            {/* Steering wheel icon */}
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.55.06-1.08.17-1.6L7.5 12h9l3.33-1.6c.11.52.17 1.05.17 1.6 0 4.41-3.59 8-8 8zm-5-9.5c0-.83.67-1.5 1.5-1.5h7c.83 0 1.5.67 1.5 1.5v.5H7v-.5z" />
            </svg>
            <span>سجّل كابتن للعمل الآن</span>
            <span className="font-mono text-red-200 tracking-tighter group-hover:-translate-x-1 transition-transform flex items-center">
              <ChevronLeft className="w-4 h-4 -mr-1" />
              <ChevronLeft className="w-4 h-4" />
            </span>
          </button>
        </div>

        {/* Center: Quick navigation links matching screenshot */}
        <div className="flex items-center gap-4 sm:gap-8 text-xs font-bold">
          
          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors relative py-1 cursor-pointer"
          >
            <div className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E50914]" />
            </div>
            <span className="hidden sm:inline">الإشعارات</span>
          </button>

          {/* Wallet */}
          <button
            onClick={onOpenWalletModal}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors py-1 cursor-pointer"
          >
            <Wallet className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">المحفظة</span>
          </button>

          {/* Driver Mode */}
          <button
            onClick={onSwitchToDriver}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors py-1 cursor-pointer"
          >
            <Car className="w-4 h-4 text-[#E50914]" />
            <span className="hidden sm:inline">السائق</span>
          </button>

        </div>

        {/* Left (RTL): Brand Logo with Slogan matching screenshot */}
        <div className="hidden md:flex items-center">
          <Logo size="sm" showSlogan={true} sloganText="شريكك في كل طريق" />
        </div>

      </div>
    </div>
  );
};
