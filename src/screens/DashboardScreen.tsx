import { useState } from 'react';
import { Car, CheckCircle2, MoreHorizontal, Power, Star, Wallet } from 'lucide-react';
import { driver } from './data';
import { Card, PrimaryButton, money } from './ui';

export default function DashboardScreen({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [online, setOnline] = useState(true);

  const tiles = [
    { icon: Wallet, label: 'الرحلات', hint: money(driver.todayEarnings), go: 'worklog' },
    { icon: Car, label: 'المركبات', hint: `سوناتا ${driver.carYear}`, go: 'profile' },
    { icon: MoreHorizontal, label: 'المزيد', hint: 'الإعدادات', go: 'verify' },
  ];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${
            online ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' : 'border-white/15 bg-white/5 text-white/50'
          }`}
        >
          <span className={`h-2 w-2 rounded-full ${online ? 'bg-emerald-400' : 'bg-white/30'}`} />
          {online ? 'متصل وجاهز' : 'غير متصل'}
        </span>
        <span className="flex items-center gap-1 rounded-full bg-red-600/20 px-2.5 py-1 text-xs font-bold text-red-300">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {driver.rating}
        </span>
      </div>

      <div className="mb-4 rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-600 to-red-900 p-5 shadow-[0_12px_40px_rgba(220,20,30,0.3)]">
        <p className="text-sm text-white/80">الرصيد المتاح</p>
        <p className="mt-1 text-4xl font-extrabold tabular-nums">{money(driver.balance)}</p>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-black/30 px-3.5 py-2.5 text-sm">
          <span className="text-white/80">رحلات اليوم</span>
          <span className="font-extrabold">{driver.todayTrips} رحلة</span>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-3">
        {tiles.map(({ icon: Icon, label, hint, go }) => (
          <button
            key={label}
            onClick={() => onNavigate(go)}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center transition hover:border-red-500/50 hover:bg-red-600/10"
          >
            <Icon className="mx-auto mb-2 h-6 w-6 text-red-400" />
            <p className="text-sm font-bold">{label}</p>
            <p className="mt-0.5 text-[11px] text-white/40">{hint}</p>
          </button>
        ))}
      </div>

      <Card className="mb-5 flex items-center justify-between !py-3.5">
        <span className="flex items-center gap-2 text-sm text-white/70">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          أرباح اليوم المحققة
        </span>
        <span className="font-extrabold tabular-nums">{money(driver.todayEarnings)}</span>
      </Card>

      <PrimaryButton variant={online ? 'solid' : 'outline'} onClick={() => setOnline((o) => !o)}>
        <Power className="h-4 w-4" />
        {online ? 'إنهاء المناوبة والراحة' : 'بدء المناوبة'}
      </PrimaryButton>
    </div>
  );
}
