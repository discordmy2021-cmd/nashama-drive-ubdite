import { useEffect, useState } from 'react';
import { MapPin, MessageCircle, Phone, Share2 } from 'lucide-react';
import { driver, route } from './data';
import { Avatar, PrimaryButton, Stars, money } from './ui';

export default function LiveTripScreen() {
  const [minutes, setMinutes] = useState(route.etaMin);
  const [notice, setNotice] = useState<string | null>(null);

  // عدّاد تنازلي تجريبي للوقت المتبقي. اربطه لاحقاً ببيانات GPS الحقيقية
  useEffect(() => {
    const id = setInterval(() => setMinutes((m) => (m > 1 ? m - 1 : m)), 20000);
    return () => clearInterval(id);
  }, []);

  async function share() {
    const text = `أنا في رحلة مع الكابتن ${driver.name} (${driver.car}، لوحة ${driver.plate}). الوصول خلال ${minutes} دقائق.`;
    try {
      if (navigator.share) await navigator.share({ title: 'رحلتي مع نشاما درايف', text });
      else {
        await navigator.clipboard.writeText(text);
        setNotice('تم نسخ تفاصيل الرحلة، الصقها وأرسلها لمن تريد');
      }
    } catch {
      /* المستخدم أغلق نافذة المشاركة */
    }
  }

  function call() {
    window.location.href = `tel:${driver.phone.replace(/-/g, '')}`;
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 font-bold">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          رحلة نشطة
        </span>
        <span className="text-white/60">تتبع السائق</span>
      </div>

      {/* الخريطة */}
      <div className="relative mb-4 h-64 overflow-hidden rounded-3xl border border-white/10 bg-[#101010]">
        <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label="خريطة مسار الرحلة">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="400" height="260" fill="url(#grid)" />
          <path d="M0 190 L400 120 M120 0 L170 260 M300 0 L260 260" stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
          <path
            id="trip-route"
            d="M50 60 C140 60, 170 140, 230 130 S330 150, 350 215"
            fill="none"
            stroke="#e11d2a"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="50" cy="60" r="8" fill="#101010" stroke="#e11d2a" strokeWidth="3" />
          <circle cx="350" cy="215" r="8" fill="#34d399" />
          <g>
            <circle r="13" fill="#e11d2a" opacity="0.25">
              <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle r="8" fill="#e11d2a" stroke="#fff" strokeWidth="2" />
            <animateMotion dur="24s" repeatCount="indefinite" rotate="auto">
              <mpath href="#trip-route" />
            </animateMotion>
          </g>
        </svg>
        <div className="absolute left-3 top-3 rounded-xl bg-black/70 px-3 py-2 text-xs backdrop-blur">
          <p className="text-white/50">المسافة</p>
          <p className="font-extrabold">{route.distanceKm} كم</p>
        </div>
        <div className="absolute right-3 top-3 rounded-xl bg-black/70 px-3 py-2 text-xs backdrop-blur">
          <p className="text-white/50">الوقت المتبقي</p>
          <p className="font-extrabold">{minutes} دقائق</p>
        </div>
      </div>

      {/* بطاقة السائق */}
      <div className="mb-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
        <Avatar name={driver.name} size={52} />
        <div className="min-w-0 flex-1">
          <p className="font-extrabold">{driver.name}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/60">
            <Stars value={driver.rating} size={12} /> {driver.rating} ({driver.ratingCount})
          </p>
        </div>
        <div className="text-left">
          <p className="text-sm font-extrabold">{driver.car}</p>
          <p className="mt-1 inline-block rounded-md border border-white/20 px-2 py-0.5 text-xs tabular-nums">{driver.plate}</p>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-3 gap-2.5">
        {[
          { icon: MessageCircle, label: 'مراسلة', onClick: () => setNotice('المراسلة تحتاج ربط خدمة الدردشة بالسيرفر') },
          { icon: Phone, label: 'اتصال', onClick: call },
          { icon: Share2, label: 'مشاركة', onClick: share },
        ].map(({ icon: Icon, label, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-red-500/40 bg-red-600/10 py-3 text-xs font-bold text-red-300 transition hover:bg-red-600/20"
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </div>

      {notice && (
        <p role="status" className="mb-3 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-center text-xs text-white/80">
          {notice}
        </p>
      )}

      <div className="mb-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm">
        <span className="flex items-center gap-2 text-white/70">
          <MapPin className="h-4 w-4 text-emerald-400" />
          {route.to}
        </span>
        <span className="font-extrabold text-red-400">{money(driver.fare)}</span>
      </div>

      <PrimaryButton>تفاصيل الرحلة المباشرة</PrimaryButton>
    </div>
  );
}
