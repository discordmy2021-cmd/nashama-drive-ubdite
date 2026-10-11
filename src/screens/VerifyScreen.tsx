import { useState } from 'react';
import { CheckCircle2, Hash, Loader2, Phone, ShieldCheck } from 'lucide-react';
import { driver } from './data';
import { Avatar, Card, PrimaryButton, ScreenTitle } from './ui';

type Status = 'idle' | 'checking' | 'ok' | 'error';

const ID_RE = /^[A-Z]{2}-\d{4}$/;

export default function VerifyScreen() {
  const [phone, setPhone] = useState(driver.phone);
  const [captainId, setCaptainId] = useState(driver.captainId);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function verify() {
    setError('');
    if (!/^\d{3}-?\d{7}$/.test(phone.replace(/\s/g, ''))) {
      setStatus('error');
      return setError('رقم الهاتف غير صحيح (مثال: 079-5847923)');
    }
    if (!ID_RE.test(captainId.trim().toUpperCase())) {
      setStatus('error');
      return setError('معرف السائق يجب أن يكون بالشكل ND-1045');
    }
    setStatus('checking');
    // استبدل هذا الانتظار باستدعاء السيرفر للتحقق الحقيقي
    await new Promise((r) => setTimeout(r, 900));
    const match = captainId.trim().toUpperCase() === driver.captainId;
    setStatus(match ? 'ok' : 'error');
    if (!match) setError('لم يتم العثور على سائق بهذا المعرف');
  }

  return (
    <div>
      <div className="mb-5 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/40 bg-red-600/15">
          <ShieldCheck className="h-7 w-7 text-red-500" />
        </div>
        <ScreenTitle title="تسجيل والتحقق كابتن" subtitle="أدخل بيانات الاعتماد للوصول إلى لوحة السائق" />
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="v-phone" className="mb-1.5 block text-sm font-semibold text-white/80">
            رقم هاتف السائق
          </label>
          <div className="relative">
            <Phone className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              id="v-phone"
              dir="ltr"
              inputMode="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setStatus('idle');
              }}
              className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-4 pr-11 text-right text-[15px] outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
            />
          </div>
        </div>

        <div>
          <label htmlFor="v-id" className="mb-1.5 block text-sm font-semibold text-white/80">
            معرف السائق
          </label>
          <div className="relative">
            <Hash className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              id="v-id"
              dir="ltr"
              value={captainId}
              onChange={(e) => {
                setCaptainId(e.target.value);
                setStatus('idle');
              }}
              className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-4 pr-11 text-right text-[15px] uppercase outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
            />
          </div>
        </div>

        {status === 'error' && (
          <p role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 px-3.5 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <PrimaryButton onClick={verify} disabled={status === 'checking'}>
          {status === 'checking' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : status === 'ok' ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <ShieldCheck className="h-4 w-4" />
          )}
          {status === 'ok' ? 'تم التحقق بنجاح' : 'تحقق من الكابتن'}
        </PrimaryButton>
      </div>

      {status === 'ok' && (
        <div className="mt-6">
          <p className="mb-2 text-xs text-white/50">السائق المختار</p>
          <Card className="flex items-center gap-3">
            <Avatar name={driver.name} size={48} />
            <div className="min-w-0 flex-1">
              <p className="font-extrabold">{driver.name}</p>
              <p className="text-xs text-white/50">كود الاعتماد: {driver.captainId}</p>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
              معتمد
            </span>
          </Card>
        </div>
      )}
    </div>
  );
}
