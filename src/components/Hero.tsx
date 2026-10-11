import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, Phone, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroProps {
  onOpenBooking: () => void;
  onLearnMore: () => void;
  onAuthSuccess?: (user: { name: string; role: 'rider' | 'driver' }) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onLearnMore,
  onAuthSuccess
}) => {
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [identifier, setIdentifier] = useState('079-5847923');
  const [password, setPassword] = useState('••••••••');
  const [fullName, setFullName] = useState('');
  const [accountType, setAccountType] = useState<'rider' | 'driver'>('rider');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#E50914', '#ffffff', '#ff4d4d']
        });
      } catch (err) {
        // ignore
      }

      const userName = fullName || (identifier.includes('@') ? identifier.split('@')[0] : 'كابتن محمود');
      setToastMessage(
        authTab === 'login'
          ? `أهلاً بك مجدداً في نشاما درايف! تم تسجيل الدخول بنجاح.`
          : `تم إنشاء حسابك الجديد بنجاح في نشاما درايف!`
      );

      if (onAuthSuccess) {
        onAuthSuccess({
          name: userName,
          role: accountType
        });
      }

      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    }, 700);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
      setToastMessage(`تم تسجيل الدخول بنجاح عبر حساب ${provider}`);
      setTimeout(() => setToastMessage(null), 3500);
    }, 500);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#09090b] via-[#0d0d12] to-[#09090c]">
      {/* Background ambient glow effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#E50914]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-red-950/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 flex items-center justify-between shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top duration-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <p className="text-sm font-semibold">{toastMessage}</p>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-xs text-emerald-400 underline hover:text-white mr-4"
            >
              إغلاق
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT COLUMN: Hero Brand, Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Super Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/50 border border-red-800/40 text-red-300 text-xs font-semibold backdrop-blur-sm shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
              <span>المنصة الرائدة في المملكة الأردنية الهاشمية</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#E50914]" />
            </div>

            {/* Main Headline styled exactly as screenshot */}
            <div className="space-y-2">
              <div className="flex items-baseline flex-wrap gap-3 font-black tracking-tight">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#E50914] drop-shadow-[0_0_20px_rgba(229,9,20,0.6)] font-['Cairo']">
                  نشاما
                </h1>
                <span className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white font-['Cairo']">
                  درايف
                </span>
              </div>

              {/* Tagline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-100 font-['Tajawal'] tracking-wide">
                رحلتك... <span className="text-zinc-300">بأمان وراحة</span>
              </h2>
            </div>

            {/* Description matching exact Arabic phrasing */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed font-normal">
              خدمة نقل ذكية وسريعة توصلك لأي مكان بأسهل طريقة وبأفضل الأسعار.
              نوفر لك تجربة تنقل موثوقة وفورية مع نخبة من أمهر السائقين المعتمدين وسيارات مجهزة بأعلى معايير الراحة والسلامة.
            </p>

            {/* Action Buttons styled like the screenshot */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onOpenBooking}
                className="group relative flex items-center justify-center gap-2 bg-[#E50914] hover:bg-[#c90812] text-white px-8 py-3.5 rounded-full font-bold text-base shadow-[0_0_25px_rgba(229,9,20,0.5)] hover:shadow-[0_0_35px_rgba(229,9,20,0.8)] transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>اطلب رحلة الآن</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </button>

              <button
                onClick={onLearnMore}
                className="flex items-center justify-center gap-2 bg-transparent hover:bg-zinc-800/60 text-zinc-200 hover:text-white px-7 py-3.5 rounded-full font-bold text-base border border-zinc-700/80 hover:border-zinc-500 transition-all cursor-pointer"
              >
                <span>تعرف على المزيد</span>
              </button>
            </div>

            {/* Visual car banner strip in hero (night city background + car) */}
            <div className="pt-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-gradient-to-r from-black via-zinc-950 to-zinc-900 h-56 sm:h-64 flex items-center">
                {/* Background Car Image */}
                <img
                  src="/images/hero-car.jpg"
                  alt="سيارة نشاما درايف الفاخرة"
                  className="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-700 hover:scale-105"
                />

                {/* Dark & Red Gradient overlays for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                {/* Content inside visual banner */}
                <div className="relative z-10 p-6 max-w-sm space-y-2">
                  <div className="inline-block px-2.5 py-0.5 rounded bg-[#E50914]/90 text-white text-[11px] font-bold">
                    جاهزون لخدمتك على مدار الساعة
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow">
                    تنقّل بكل ثقة وسرعة في كل زاوية
                  </h3>
                  <p className="text-xs text-zinc-300">
                    تتبع دقيق، أسعار واضحة بدون مفاجآت، ودعم متواصل.
                  </p>
                </div>

                {/* Cockpit preview floating bubble (mimicking the circular cockpit in screenshot) */}
                <div className="hidden sm:block absolute left-4 bottom-4 w-28 h-28 rounded-2xl overflow-hidden border-2 border-red-600/70 shadow-[0_0_15px_rgba(229,9,20,0.5)] z-10">
                  <img
                    src="/images/car-interior.jpg"
                    alt="داخلية مقصورة نشاما درايف"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 py-0.5 text-center text-[9px] font-bold text-red-300">
                    مقصورة فاخرة
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Authentic Login / Auth Card (5 cols) matching screenshot */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E50914]/20 to-red-900/30 rounded-3xl blur-xl" />

              {/* Card Container */}
              <div className="relative bg-[#0d0d12]/95 border border-zinc-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                
                {/* Header of Auth Box */}
                <div className="text-center space-y-1.5 mb-6">
                  <h3 className="text-xl sm:text-2xl font-black text-white font-['Cairo'] tracking-tight">
                    مرحباً بك في نشاما درايف
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                    سجل دخولك للمتابعة أو أنشئ حساب جديد
                  </p>
                </div>

                {/* Tabs: تسجيل الدخول / إنشاء حساب */}
                <div className="flex bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 mb-6">
                  <button
                    type="button"
                    onClick={() => setAuthTab('login')}
                    className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                      authTab === 'login'
                        ? 'bg-[#18181f] text-white shadow-md border border-zinc-700/60'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    تسجيل الدخول
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthTab('register')}
                    className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                      authTab === 'register'
                        ? 'bg-[#18181f] text-white shadow-md border border-zinc-700/60'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    إنشاء حساب
                  </button>
                </div>

                {/* Auth Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Account Type Selector for Register */}
                  {authTab === 'register' && (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-zinc-300 text-right">
                        نوع الحساب:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setAccountType('rider')}
                          className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                            accountType === 'rider'
                              ? 'bg-red-950/60 border-[#E50914] text-white'
                              : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white'
                          }`}
                        >
                          راكب (عميل)
                        </button>
                        <button
                          type="button"
                          onClick={() => setAccountType('driver')}
                          className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                            accountType === 'driver'
                              ? 'bg-red-950/60 border-[#E50914] text-white'
                              : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white'
                          }`}
                        >
                          سائق (كابتن)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Full Name (if registering) */}
                  {authTab === 'register' && (
                    <div className="space-y-1 text-right">
                      <label className="text-xs font-semibold text-zinc-300">الاسم الكامل</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="مثال: أحمد عبد الله"
                          className="w-full bg-[#141419] border border-zinc-800 rounded-xl px-4 py-3 pr-10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50914] transition-colors"
                        />
                        <User className="absolute right-3 top-3.5 w-4 h-4 text-zinc-400" />
                      </div>
                    </div>
                  )}

                  {/* Identifier: Phone or Email */}
                  <div className="space-y-1 text-right">
                    <label className="text-xs font-semibold text-zinc-300">
                      رقم الهاتف أو البريد الإلكتروني
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="079-XXXXXXX أو name@example.com"
                        className="w-full bg-[#141419] border border-zinc-800 rounded-xl px-4 py-3 pr-10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50914] transition-colors"
                      />
                      <Phone className="absolute right-3 top-3.5 w-4 h-4 text-zinc-400" />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1 text-right">
                    <label className="text-xs font-semibold text-zinc-300">كلمة المرور</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="أدخل كلمة المرور"
                        className="w-full bg-[#141419] border border-zinc-800 rounded-xl px-10 py-3 pr-10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50914] transition-colors"
                      />
                      <Lock className="absolute right-3 top-3.5 w-4 h-4 text-zinc-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-3.5 text-zinc-400 hover:text-white focus:outline-none cursor-pointer"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember me & Forgot Password */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-white">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-[#E50914] focus:ring-red-500 focus:ring-offset-0 accent-[#E50914]"
                      />
                      <span>تذكرني</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => setToastMessage('تم إرسال رابط استعادة كلمة المرور إلى هاتفك المسجل')}
                      className="text-zinc-400 hover:text-red-400 transition-colors"
                    >
                      نسيت كلمة المرور؟
                    </button>
                  </div>

                  {/* Big Red Button matching screenshot */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#E50914] hover:bg-[#c90812] text-white py-3.5 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(229,9,20,0.5)] hover:shadow-[0_0_30px_rgba(229,9,20,0.7)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span>{authTab === 'login' ? 'تسجيل الدخول' : 'تأكيد التسجيل والمتابعة'}</span>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-zinc-800" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-[#0d0d12] px-3 text-zinc-400 font-medium">
                        أو تسجيل الدخول باستخدام
                      </span>
                    </div>
                  </div>

                  {/* Social Buttons: Google & Apple (Matching screenshot) */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Google Button */}
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('Google')}
                      className="flex items-center justify-center gap-2 bg-[#16161c] hover:bg-zinc-800/90 text-zinc-200 border border-zinc-800 hover:border-zinc-700 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#EA4335"
                          d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                        />
                        <path
                          fill="#4285F4"
                          d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.9z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.2-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.8 7.5 23 12 23z"
                        />
                      </svg>
                      <span>Google</span>
                    </button>

                    {/* Apple Button */}
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('Apple')}
                      className="flex items-center justify-center gap-2 bg-[#16161c] hover:bg-zinc-800/90 text-zinc-200 border border-zinc-800 hover:border-zinc-700 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.71-7.96-12.01-14.64-5.87-9.06-10.45-19.34-13.74-30.83-3.29-11.49-4.94-22.39-4.94-32.7 0-14.76 3.63-26.68 10.88-35.77 7.25-9.09 16.48-13.72 27.69-13.88 5.12 0 10.59 1.34 16.39 4.02 5.8 2.68 9.53 4.07 11.19 4.17 1.34 0 5.42-1.57 12.24-4.71 6.82-3.14 12.72-4.47 17.7-3.99 13.62 1.06 24.19 6.22 31.7 15.48-11.97 7.24-17.85 17.2-17.64 29.87.21 9.88 4.03 18.06 11.45 24.55 7.42 6.48 16.03 10.22 25.82 11.21-2.12 6.38-4.63 12.87-7.53 19.46zM119.22 33.72c0-7.39 2.74-14.38 8.21-20.97 5.48-6.59 12.28-10.74 20.42-12.46.21 1.07.32 2.04.32 2.9 0 7.39-2.79 14.5-8.38 21.32-5.59 6.82-12.62 10.88-21.09 12.18-.32-1.07-.48-2.06-.48-2.97z" />
                      </svg>
                      <span>Apple</span>
                    </button>
                  </div>

                </form>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
