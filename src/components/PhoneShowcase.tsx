import React, { useState } from 'react';
import { Driver } from '../types';
import { RideTrackingScreen } from './PhoneScreens/RideTrackingScreen';
import { DriverProfileScreen } from './PhoneScreens/DriverProfileScreen';
import { DriverVerifyScreen } from './PhoneScreens/DriverVerifyScreen';
import { DriverDashboardScreen } from './PhoneScreens/DriverDashboardScreen';
import { WorkLogScreen } from './PhoneScreens/WorkLogScreen';
import { Sparkles } from 'lucide-react';

interface PhoneShowcaseProps {
  driver: Driver;
  onOpenChat: () => void;
  onOpenCall: () => void;
  onBookRide: () => void;
}

export const PhoneShowcase: React.FC<PhoneShowcaseProps> = ({
  driver,
  onOpenChat,
  onOpenCall,
  onBookRide
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const screens = [
    {
      id: 0,
      title: 'تتبع الرحلة المباشر',
      subtitle: 'خريطة تفاعلية وموقع السائق والوقت المقدر',
      component: (
        <RideTrackingScreen
          driver={driver}
          onOpenChat={onOpenChat}
          onOpenCall={onOpenCall}
        />
      )
    },
    {
      id: 1,
      title: 'ملف السائق والتسعيرة',
      subtitle: 'تقييم الكابتن، تفاصيل المركبة وحجز الرحلة',
      component: (
        <DriverProfileScreen
          driver={driver}
          onBookRide={onBookRide}
        />
      )
    },
    {
      id: 2,
      title: 'تحقق وتسجيل الكابتن',
      subtitle: 'التحقق السريع من رقم الهاتف ومعرف السائق',
      component: (
        <DriverVerifyScreen
          driver={driver}
          onVerified={() => setActiveTab(3)}
        />
      )
    },
    {
      id: 3,
      title: 'لوحة تحكم السائق',
      subtitle: 'المحفظة، الأرباح اليومية، واستقبال الطلبات',
      component: (
        <DriverDashboardScreen
          driver={driver}
        />
      )
    },
    {
      id: 4,
      title: 'سجل العمل والتقارير',
      subtitle: 'إحصائيات الأداء، نسبة القبول، وسجل المشاوير',
      component: (
        <WorkLogScreen
          driver={driver}
        />
      )
    }
  ];

  return (
    <section id="app-showcase" className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-[#b91119] via-[#cf1420] to-[#8c0a10]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#09090c] to-transparent opacity-80 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#09090c] to-transparent opacity-80 pointer-events-none" />
      
      {/* Decorative radial lighting */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-400/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/30 border border-white/20 text-white text-xs font-bold backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>تجربة متكاملة للراكب والكابتن</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Cairo'] tracking-tight drop-shadow-md">
            تطبيق ذكي متكامل يلبي كافة احتياجاتك
          </h2>

          <p className="text-red-100 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            شاشات تفاعلية بتصميم عصري وأداء فائق السرعة، انقر على أي شاشة لتجربة الميزات الحية!
          </p>

          {/* Screen Switcher Pills for Mobile/Tablet */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3">
            {screens.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(index)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === index
                    ? 'bg-white text-[#cf1420] shadow-xl scale-105'
                    : 'bg-black/30 text-white/90 hover:bg-black/40 border border-white/20'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* 5 Mockup Phones Display (Side-by-side matching screenshot) */}
        <div className="relative">
          
          {/* Scrollable Container with horizontal scroll on small devices and flex on large */}
          <div className="flex items-center justify-center gap-4 lg:gap-6 overflow-x-auto pb-8 pt-4 px-2 snap-x scrollbar-thin">
            {screens.map((item, index) => {
              const isSelected = activeTab === index;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveTab(index)}
                  className={`flex-shrink-0 transition-all duration-300 cursor-pointer snap-center ${
                    isSelected
                      ? 'scale-100 ring-4 ring-white/60 shadow-[0_30px_70px_rgba(0,0,0,0.85)] z-20'
                      : 'scale-95 opacity-90 hover:opacity-100 hover:scale-[0.98]'
                  }`}
                  style={{ width: '272px' }}
                >
                  {/* Phone Device Frame */}
                  <div className="relative rounded-[42px] p-2.5 bg-zinc-950 border-[4px] border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] h-[570px] flex flex-col overflow-hidden">
                    
                    {/* Device Speaker & Dynamic Island Notch */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800 mr-2" />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-950/70" />
                    </div>

                    {/* Internal Phone Screen Container */}
                    <div className="relative flex-1 rounded-[34px] overflow-hidden bg-[#0d0d12] flex flex-col pt-3">
                      {item.component}
                    </div>

                    {/* Home Indicator Bar at Bottom of Phone */}
                    <div className="w-24 h-1 bg-zinc-600 rounded-full mx-auto mt-2 mb-0.5 opacity-60" />
                  </div>

                  {/* Caption under phone */}
                  <div className="text-center mt-3 text-white">
                    <span className="text-xs font-bold block">{item.title}</span>
                    <span className="text-[10px] text-red-200 block truncate">{item.subtitle}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
