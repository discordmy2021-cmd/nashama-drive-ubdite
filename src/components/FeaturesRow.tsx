import React from 'react';
import { MapPin, ShieldCheck, Tag, Headphones } from 'lucide-react';

export const FeaturesRow: React.FC = () => {
  const features = [
    {
      id: 'fast-pickup',
      title: 'توصيل سريع لجميع المناطق',
      subtitle: 'تغطية شاملة وأقرب سائق يصلك بدقائق معدودة',
      icon: MapPin,
    },
    {
      id: 'trusted-drivers',
      title: 'سائقين محترفين وموثوقين',
      subtitle: 'فحص أمني دقيق وتدريب عالي على أفضل معايير الضيافة',
      icon: ShieldCheck,
    },
    {
      id: 'fair-pricing',
      title: 'أسعار مناسبة ومعرفة مسبقاً',
      subtitle: 'لا مفاجآت في التسعيرة، تعرف على تكلفة مشوارك بدقة',
      icon: Tag,
    },
    {
      id: 'support-247',
      title: 'دعم فني 24/7',
      subtitle: 'فريق دعم محلي جاهز لمساعدتك في أي وقت على مدار الساعة',
      icon: Headphones,
    },
  ];

  return (
    <section id="features-section" className="relative py-10 bg-[#09090c] border-y border-zinc-900/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* The 4 Feature Cards Grid matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative bg-[#0e0e13]/80 hover:bg-[#15151c] border border-zinc-800/80 hover:border-red-900/60 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(229,9,20,0.3)] hover:-translate-y-1 flex flex-col items-center text-center cursor-default"
              >
                {/* Glow behind icon */}
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-[#E50914]/20 rounded-full blur-md group-hover:bg-[#E50914]/40 transition-colors" />
                  <div className="relative w-14 h-14 rounded-2xl bg-zinc-900/90 border border-zinc-700/50 flex items-center justify-center text-[#E50914] shadow-inner group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 drop-shadow-[0_0_8px_rgba(229,9,20,0.8)]" />
                  </div>
                </div>

                {/* Feature Title matching the screenshot */}
                <h4 className="text-base font-bold text-white mb-1.5 font-['Cairo'] tracking-tight group-hover:text-red-400 transition-colors">
                  {item.title}
                </h4>

                {/* Subtitle / explanation */}
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
