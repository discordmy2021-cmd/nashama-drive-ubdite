import { useEffect, useState, type ReactNode } from 'react';
import { AlertCircle, Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck, User } from 'lucide-react';
import { useAuth } from './AuthContext';
import { AuthError, passwordStrength } from './authService';
import { appleEnabled, googleEnabled, preloadSocialScripts } from './social';

type Mode = 'login' | 'register';
type Busy = null | 'form' | 'google' | 'apple';

const strengthLabels = ['ضعيفة جداً', 'ضعيفة', 'متوسطة', 'جيدة', 'قوية'];
const strengthColors = ['bg-white/10', 'bg-red-600', 'bg-orange-500', 'bg-yellow-400', 'bg-emerald-500'];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.1 5.5c4.3-4 6.8-9.8 6.8-16.9z" />
      <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-2.9-.8-4.7s.3-3.3.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.1-5.5c-2 1.4-4.6 2.3-8.8 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M16.37 1.43c0 1.14-.46 2.22-1.2 3-.8.85-2.1 1.5-3.16 1.42-.13-1.1.42-2.27 1.13-3 .8-.84 2.17-1.46 3.23-1.42zM20.5 17.1c-.55 1.27-.82 1.84-1.53 2.96-1 1.56-2.4 3.5-4.14 3.52-1.55.02-1.95-1.01-4.05-1-2.1.01-2.54 1.02-4.09 1-1.74-.02-3.07-1.77-4.07-3.33C-.2 15.9-.5 10.9 1.6 8.2c1.5-1.9 3.86-3.01 6.08-3.01 2.26 0 3.68 1.24 5.55 1.24 1.82 0 2.93-1.25 5.55-1.25 1.98 0 4.08 1.08 5.57 2.94-4.89 2.68-4.1 9.66-.85 10z" />
    </svg>
  );
}

function Field(props: {
  id: string;
  label: string;
  icon: ReactNode;
  children: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={props.id} className="mb-1.5 block text-sm font-semibold text-white/80">
        {props.label}
      </label>
      <div className="relative flex items-center rounded-xl border border-white/10 bg-black/40 transition focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/30">
        <span className="pointer-events-none absolute right-3.5 text-white/40">{props.icon}</span>
        {props.children}
        {props.trailing && <span className="absolute left-2">{props.trailing}</span>}
      </div>
    </div>
  );
}

const inputClass =
  'w-full bg-transparent py-3.5 pr-11 pl-11 text-[15px] text-white placeholder:text-white/30 outline-none';

export default function LoginPage() {
  const { login, register, loginWithGoogle, loginWithApple } = useAuth();

  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [terms, setTerms] = useState(false);
  const [busy, setBusy] = useState<Busy>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    preloadSocialScripts();
  }, []);

  const isRegister = mode === 'register';
  const strength = passwordStrength(password);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setNotice(null);
  }

  async function run(kind: Exclude<Busy, null>, action: () => Promise<void>) {
    setBusy(kind);
    setError(null);
    setNotice(null);
    try {
      await action();
    } catch (e) {
      setError(e instanceof AuthError ? e.message : 'حدث خطأ غير متوقع، حاول مرة أخرى');
    } finally {
      setBusy(null);
    }
  }

  function onSubmit() {
    if (busy) return;
    if (isRegister) {
      if (password !== confirm) return setError('كلمتا المرور غير متطابقتين');
      if (!terms) return setError('يجب الموافقة على الشروط وسياسة الخصوصية للمتابعة');
      void run('form', () => register(name, identifier, password));
    } else {
      void run('form', () => login(identifier, password, remember));
    }
  }

  function onForgot() {
    if (!identifier.trim()) {
      setError('اكتب بريدك أو رقم هاتفك أولاً ثم اضغط «نسيت كلمة المرور»');
      return;
    }
    setError(null);
    setNotice('سيصلك رابط إعادة التعيين على هذا الحساب عند ربط خدمة الإرسال في السيرفر.');
  }

  function onSocial(kind: 'google' | 'apple') {
    if (busy) return;
    void run(kind, () => (kind === 'google' ? loginWithGoogle(remember) : loginWithApple(remember)));
  }

  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-10 font-[Tajawal,Cairo,system-ui,sans-serif] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,20,30,0.45),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(120,0,10,0.35),transparent_55%)]"
      />

      <section className="relative w-full max-w-md">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/40 bg-red-600/15 shadow-[0_0_40px_rgba(220,20,30,0.35)]">
            <ShieldCheck className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-3xl font-extrabold">
            نشاما <span className="text-red-500">درايف</span>
          </h1>
          <p className="mt-2 text-sm text-white/60">
            {isRegister ? 'أنشئ حساب سائق جديد وابدأ رحلاتك' : 'سجّل دخولك لمتابعة رحلاتك وأرباحك'}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#121212]/90 p-6 shadow-2xl backdrop-blur">
          {/* تبديل الوضع */}
          <div role="tablist" className="mb-6 grid grid-cols-2 rounded-xl bg-black/50 p-1">
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                type="button"
                onClick={() => switchMode(m)}
                className={`rounded-lg py-2.5 text-sm font-bold transition ${
                  mode === m ? 'bg-red-600 text-white shadow' : 'text-white/60 hover:text-white'
                }`}
              >
                {m === 'login' ? 'تسجيل الدخول' : 'حساب جديد'}
              </button>
            ))}
          </div>

          {/* أزرار الدخول الاجتماعي */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onSocial('google')}
              disabled={busy !== null}
              title={googleEnabled ? undefined : 'يحتاج VITE_GOOGLE_CLIENT_ID'}
              className="flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-neutral-900 transition hover:bg-neutral-200 disabled:opacity-60"
            >
              {busy === 'google' ? <Loader2 className="h-5 w-5 animate-spin" /> : <GoogleIcon />}
              Google
            </button>
            <button
              type="button"
              onClick={() => onSocial('apple')}
              disabled={busy !== null}
              title={appleEnabled ? undefined : 'يحتاج VITE_APPLE_CLIENT_ID'}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-black py-3 text-sm font-bold text-white transition hover:bg-neutral-900 disabled:opacity-60"
            >
              {busy === 'apple' ? <Loader2 className="h-5 w-5 animate-spin" /> : <AppleIcon />}
              Apple
            </button>
          </div>

          <div className="my-5 flex items-center gap-3 text-xs text-white/40">
            <span className="h-px flex-1 bg-white/10" />
            أو بالبريد / رقم الهاتف
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {/* النموذج اليدوي */}
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="space-y-4"
          >
            {isRegister && (
              <Field id="name" label="الاسم الكامل" icon={<User className="h-4 w-4" />}>
                <input
                  id="name"
                  className={inputClass}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder="محمود علي"
                />
              </Field>
            )}

            <Field id="identifier" label="البريد الإلكتروني أو رقم الهاتف" icon={<Mail className="h-4 w-4" />}>
              <input
                id="identifier"
                className={inputClass}
                dir="ltr"
                style={{ textAlign: 'right' }}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete="username"
                inputMode="email"
                placeholder="name@email.com  /  079xxxxxxx"
              />
            </Field>

            <Field
              id="password"
              label="كلمة المرور"
              icon={<Lock className="h-4 w-4" />}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label={showPw ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                  className="rounded-lg p-2 text-white/50 transition hover:text-white"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            >
              <input
                id="password"
                className={inputClass}
                dir="ltr"
                style={{ textAlign: 'right' }}
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                placeholder="••••••••"
              />
            </Field>

            {isRegister && (
              <>
                <div aria-live="polite">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          strength >= i ? strengthColors[strength] : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-1.5 text-xs text-white/50">
                    {password ? `قوة كلمة المرور: ${strengthLabels[strength]}` : '8 أحرف على الأقل، وتحتوي حرفاً ورقماً'}
                  </p>
                </div>

                <Field id="confirm" label="تأكيد كلمة المرور" icon={<Lock className="h-4 w-4" />}>
                  <input
                    id="confirm"
                    className={inputClass}
                    dir="ltr"
                    style={{ textAlign: 'right' }}
                    type={showPw ? 'text' : 'password'}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                    placeholder="••••••••"
                  />
                </Field>

                <label className="flex cursor-pointer items-start gap-2.5 text-sm text-white/70">
                  <input
                    type="checkbox"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-red-600"
                  />
                  <span>أوافق على شروط الاستخدام وسياسة الخصوصية</span>
                </label>
              </>
            )}

            {!isRegister && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-white/70">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 accent-red-600"
                  />
                  تذكرني
                </label>
                <button type="button" onClick={onForgot} className="font-semibold text-red-400 hover:text-red-300">
                  نسيت كلمة المرور؟
                </button>
              </div>
            )}

            <div aria-live="assertive">
              {error && (
                <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-3.5 py-3 text-sm text-red-300">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {error}
                </p>
              )}
              {notice && (
                <p className="rounded-xl border border-white/15 bg-white/5 px-3.5 py-3 text-sm text-white/80">{notice}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={busy !== null}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-base font-extrabold shadow-[0_8px_24px_rgba(220,20,30,0.35)] transition hover:bg-red-500 disabled:opacity-60"
            >
              {busy === 'form' && <Loader2 className="h-5 w-5 animate-spin" />}
              {isRegister ? 'إنشاء الحساب' : 'تسجيل الدخول'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-white/60">
            {isRegister ? 'لديك حساب؟' : 'ليس لديك حساب؟'}{' '}
            <button
              type="button"
              onClick={() => switchMode(isRegister ? 'login' : 'register')}
              className="font-bold text-red-400 hover:text-red-300"
            >
              {isRegister ? 'سجّل الدخول' : 'أنشئ حساباً'}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
