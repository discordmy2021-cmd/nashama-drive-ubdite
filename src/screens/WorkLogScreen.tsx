import { useState } from 'react';
import { CheckCircle2, Download, Star, TrendingUp } from 'lucide-react';
import { driver, trips, CURRENCY } from './data';
import { Card, PrimaryButton, ScreenTitle, money } from './ui';

const ranges = ['اليوم', 'هذا الأسبوع', 'هذا الشهر'] as const;

export default function WorkLogScreen() {
  const [range, setRange] = useState<(typeof ranges)[number]>('هذا الأسبوع');

  function exportCsv() {
    const header = ['الوقت', 'من', 'إلى', `الأجرة (${CURRENCY})`, 'التقييم', 'الحالة'];
    const rows = trips.map((t) => [t.time, t.from, t.to, t.fare.toFixed(2), t.rating, t.status]);
    const csv = [header, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    // BOM حتى يعرض Excel العربية بشكل صحيح
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nashama-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <ScreenTitle title="سجل العمل" subtitle="إحصائيات الأداء ونسبة القبول وسجل المشاوير" />

      <div className="mb-4 grid grid-cols-2 gap-3">
        <Card>
          <p className="text-xs text-white/50">نسبة القبول</p>
          <p className="mt-1 flex items-center gap-1.5 text-2xl font-extrabold text-emerald-400">
            <TrendingUp className="h-5 w-5" />
            {driver.acceptance}%
          </p>
          <p className="mt-1 text-[11px] text-white/40">أعلى من المتوسط</p>
        </Card>
        <Card>
          <p className="text-xs text-white/50">إجمالي الرحلات</p>
          <p className="mt-1 text-2xl font-extrabold">{driver.completed}+</p>
          <p className="mt-1 text-[11px] text-white/40">سجل رحلات مكتمل</p>
        </Card>
      </div>

      <div role="tablist" className="mb-4 grid grid-cols-3 gap-1 rounded-xl bg-black/50 p-1">
        {ranges.map((r) => (
          <button
            key={r}
            role="tab"
            aria-selected={range === r}
            onClick={() => setRange(r)}
            className={`rounded-lg py-2 text-xs font-bold transition ${
              range === r ? 'bg-red-600' : 'text-white/60 hover:text-white'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-bold">رحلات اليوم ({driver.todayTrips})</span>
        <span className="text-xs text-red-400">آخر المشاوير المنجزة</span>
      </div>

      <ul className="mb-5 space-y-2.5">
        {trips.map((t) => (
          <li key={t.id}>
            <Card className="!p-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">
                    {t.from} <span className="text-red-500">←</span> {t.to}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {t.status}
                  </p>
                </div>
                <div className="shrink-0 text-left">
                  <p className="text-base font-extrabold text-red-400">{money(t.fare)}</p>
                  <p className="mt-0.5 flex items-center justify-end gap-1 text-xs text-white/50">
                    {t.time}
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {t.rating}
                  </p>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      <PrimaryButton onClick={exportCsv}>
        <Download className="h-4 w-4" />
        تصدير تقرير المشاوير
      </PrimaryButton>
    </div>
  );
}
