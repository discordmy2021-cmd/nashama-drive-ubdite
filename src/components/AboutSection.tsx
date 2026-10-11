import React from 'react';
import { ShieldCheck, Users, Sparkles, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-20 bg-[#09090c] relative overflow-hidden border-t border-zinc-900">
      
      {/* Background soft red glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#E50914]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right Text Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-red-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>قصة نشاما درايف</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Cairo'] tracking-tight">
              أكثر من مجرد تطبيق نقل... نحن <span className="text-[#E50914]">شريكك في كل طريق</span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
              انطلقت منصة <strong className="text-white">نشاما درايف</strong> برؤية أردنية عربية طموحة لإعادة تعريف تجربة التنقل الذكي. نجمع بين أحدث تقنيات تحديد المواقع وتوزيع الرحلات الفوري مع كرم وأصالة الضيافة المحلية التي يشتهر بها النشامى.
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed">
              نضع سلامتك وراحتك في مقدمة أولوياتنا من خلال معايير فحص صارمة لجميع الكباتن والسيارات، مع ضمان تسعيرة عادلة وشفافة لا تتأثر بالتقلبات غير المبررة، وحوافز استثنائية تكافئ جهود شركائنا السائقين.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-[#121219] p-4 rounded-2xl border border-zinc-800/80">
                <ShieldCheck className="w-6 h-6 text-[#E50914] mb-2" />
                <h4 className="font-bold text-sm text-white mb-1">أمان معتمد 100%</h4>
                <p className="text-xs text-zinc-400">تتبع حي للمسار ومشاركة فورية مع العائلة</p>
              </div>

              <div className="bg-[#121219] p-4 rounded-2xl border border-zinc-800/80">
                <Users className="w-6 h-6 text-emerald-400 mb-2" />
                <h4 className="font-bold text-sm text-white mb-1">كباتن محترفون</h4>
                <p className="text-xs text-zinc-400">تدريب مستمر وشهادات حسن سيرة وسلوك</p>
              </div>

              <div className="bg-[#121219] p-4 rounded-2xl border border-zinc-800/80">
                <Award className="w-6 h-6 text-amber-400 mb-2" />
                <h4 className="font-bold text-sm text-white mb-1">جودة وضيافة</h4>
                <p className="text-xs text-zinc-400">مركبات حديثة ونظيفة ومكيفة لراحتك</p>
              </div>
            </div>

          </div>

          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 group">
              <img
                src="/images/car-interior.jpg"
                alt="فخامة نشاما درايف"
                className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              
              <div className="absolute bottom-6 right-6 left-6 text-right">
                <span className="px-2.5 py-1 rounded bg-[#E50914] text-white text-[11px] font-bold inline-block mb-2">
                  معايير قياسية في الخدمة
                </span>
                <h3 className="text-xl font-bold text-white">رحلة هادئة، مريحة وآمنة</h3>
                <p className="text-xs text-zinc-300 mt-1">
                  نضمن لك أعلى مستويات الراحة من لحظة ركوبك وحتى وصولك لوجهتك بسلامة.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
