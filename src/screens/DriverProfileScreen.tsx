import { useState } from 'react';
import confetti from 'canvas-confetti';
import { BadgeCheck, Car, CheckCircle2, MapPin } from 'lucide-react';
import { driver, route } from './data';
import { Avatar, Card, PrimaryButton, Stars, money } from './ui';

export default function DriverProfileScreen({ onTrack }: { onTrack: () => void }) {
  const [booked, setBooked] = useState(false);

  function book() {
    setBooked(true);
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.75 }, colors: ['#dc1414', '#ffffff', '#ffb400'] });
  }

  return (
    <div>
      <div className="mb-5 flex flex-col items-center text-center">
        <div className="relative">
          <Avatar name={driver.name} size={92} />
          <BadgeCheck className="absolute -bottom-1 -left-1 h-6 w-6 rounded-full bg-black text-emerald-400" />
        </div>
        <h2 className="mt-3 text-xl font-extrabold">{driver.name}</h2>
        <div className="mt-1 flex items-center gap-2">
          <Stars value={driver.rating} />
          <span className="text-sm font-bold">{driver.rating}</span>
          <span className="text-xs text-white/50">({driver.ratingCount} تقييم)</span>
        </div>
        <div className="mt-3 flex gap-2 text-xs">
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">+{driver.trips.toLocaleString('en')} رحلة</span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">كابتن ماسي</span>
        </div>
      </div>

      <Card className="mb-3">
        <p className="mb-3 text-xs text-white/50">مسار الرحلة المقترح</p>
        <div className="flex gap-3">
          <div className="flex flex-col items-center pt-1">
            <span className="h-3 w-3 rounded-full border-2 border-red-500" />
            <span className="my-1 w-px flex-1 bg-gradient-to-b from-red-500 to-emerald-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-[11px] text-white/40">نقطة الانطلاق</p>
              <p className="font-bold">{route.from}</p>
            </div>
            <div>
              <p className="text-[11px] text-white/40">وجهة الوصول</p>
              <p className="font-bold">{route.to}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <Card className="text-center">
          <p className="text-xs text-white/50">التكلفة التقديرية</p>
          <p className="mt-1 text-xl font-extrabold text-red-400">{money(driver.fare)}</p>
          <p className="mt-0.5 text-[11px] text-white/40">سعر ثابت ومضمون</p>
        </Card>
        <Card className="text-center">
          <p className="flex items-center justify-center gap-1 text-xs text-white/50">
            <Car className="h-3.5 w-3.5" /> المركبة
          </p>
          <p className="mt-1 text-sm font-extrabold leading-snug">{driver.car}</p>
          <p className="mt-0.5 text-[11px] text-white/40">
            {driver.carYear} · {driver.plate}
          </p>
        </Card>
      </div>

      {booked ? (
        <div className="space-y-3">
          <p className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 py-3 text-sm font-bold text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            تم تأكيد الحجز، الكابتن في الطريق إليك
          </p>
          <PrimaryButton onClick={onTrack}>
            <MapPin className="h-4 w-4" />
            تتبع الرحلة المباشرة
          </PrimaryButton>
        </div>
      ) : (
        <PrimaryButton onClick={book}>تأكيد الحجز الآن</PrimaryButton>
      )}
    </div>
  );
}
