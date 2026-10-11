import React from 'react';
import { MapPin, Car, CheckCircle2 } from 'lucide-react';

export const HowItWorksSection: React.FC<{ onBookNow: () => void }> = ({ onBookNow }) => {
  const steps = [
    {
      step: '01',
      title: 'حدد موقعك ووجهتك',
      desc: 'افتح التطبيق أو الموقع، اكتب وجهتك المفضلة وسيقوم النظام بتحديد موقعك تلقائياً بدقة GPS فائقة.',
      icon: MapPin,
      color: 'text-[#E50914]'
    },
    {
      step: '02',
      title: 'اختر فئة السيارة واطلع على السعر',
      desc: 'نوفر لك عدة فئات تناسب ميزانيتك (توفير، كمفورت، VIP، عائلي)، السعر محدد مسبقاً وبلا أية مفاجآت.',
      icon: Car,
      color: 'text-amber-400'
    },
    {
      step: '03',
      title: 'انطلق واستمتع بمشوارك بأمان',
      desc: 'أقرب كابتن نشاما سيصلك في دقائق، تتبع مساره مباشرة على الخريطة واستمتع برحلة مريحة وسلسة.',
      icon: CheckCircle2,
      color: 'text-emerald-400'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#0b0b0f] relative overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-[#E50914] tracking-wider uppercase">بساطة وسرعة</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Cairo'] tracking-tight">
            كيف يعمل نشاما درايف؟
          </h2>
          <p className="text-sm text-zinc-400">
            ثلاث خطوات سهلة تفصلك عن مشوارك القادم براحة واطمئنان تام
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative bg-[#121219] border border-zinc-800 rounded-3xl p-6 hover:border-red-900/60 transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Step number badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-zinc-700 group-hover:text-[#E50914] transition-colors">
                    {s.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-700/60 flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-2 font-['Cairo'] group-hover:text-red-400 transition-colors">
                  {s.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  {s.desc}
                </p>

                {/* Connecting arrow for steps on desktop */}
                {index < 2 && (
                  <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-20 text-zinc-600">
                    ←
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={onBookNow}
            className="bg-[#E50914] hover:bg-[#c90812] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(229,9,20,0.5)] transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>جرب نشاما درايف الآن</span>
          </button>
        </div>

      </div>
    </section>
  );
};
