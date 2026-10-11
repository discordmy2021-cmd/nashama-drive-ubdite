import React, { useState } from 'react';
import { X, Check, ShieldCheck, DollarSign, Clock, Award, Upload } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CaptainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CaptainModal: React.FC<CaptainModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('عمان');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('2022');
  const [plateNumber, setPlateNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E50914', '#ffffff', '#22c55e']
        });
      } catch (err) {
        // ignore
      }

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0d0d13] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden font-['Cairo'] text-right max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-gradient-to-r from-red-950/60 via-[#14141d] to-[#14141d]">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-right">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 justify-end">
              <span>انضم إلى أسطول كباتن نشاما</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-ping" />
            </h3>
            <p className="text-xs text-zinc-400">حقق دخلاً ممتازاً بحرية واستقلالية تامة</p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
          {isSuccess ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.5)]">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-white">مرحباً بك في عائلة نشاما درايف!</h4>
              <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                تم استلام طلب تسجيلك بنجاح. سيتواصل معك فريق الاعتماد خلال أقل من ساعتين لتفعيل حسابك والبدء في جني الأرباح فوراً!
              </p>
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-400">
                معرف الطلب المرجعي: <span className="font-mono text-white font-bold">ND-APP-{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Value Proposition Badges */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#14141e] border border-zinc-800 rounded-xl p-2.5">
                  <DollarSign className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-white block">أعلى نسبة أرباح</span>
                  <span className="text-[9px] text-zinc-400">عمولة تنافسية</span>
                </div>
                <div className="bg-[#14141e] border border-zinc-800 rounded-xl p-2.5">
                  <Clock className="w-4 h-4 text-[#E50914] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-white block">مرونة كاملة</span>
                  <span className="text-[9px] text-zinc-400">أنت مدير وقتك</span>
                </div>
                <div className="bg-[#14141e] border border-zinc-800 rounded-xl p-2.5">
                  <Award className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-white block">مكافآت أسبوعية</span>
                  <span className="text-[9px] text-zinc-400">بونص للمتميزين</span>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-3 bg-[#13131c] p-4 rounded-2xl border border-zinc-800">
                <div className="text-xs font-bold text-[#E50914] flex items-center gap-1.5 border-b border-zinc-800/80 pb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>البيانات الشخصية للكابتن</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-300 block">الاسم الرباعي</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="مثال: محمود علي عبد الله"
                      className="w-full bg-[#1b1b26] border border-zinc-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-300 block">رقم الهاتف الفعّال</label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="079-XXXXXXX"
                      className="w-full bg-[#1b1b26] border border-zinc-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300 block">مدينة العمل الرئيسية</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#1b1b26] border border-zinc-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914]"
                  >
                    <option value="عمان">عمان (العاصمة وضواحيها)</option>
                    <option value="إربد">إربد والشمال</option>
                    <option value="الزرقاء">الزرقاء والرصيفة</option>
                    <option value="العقبة">العقبة</option>
                    <option value="السلط">السلط والبلقاء</option>
                    <option value="مادبا">مادبا</option>
                  </select>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="space-y-3 bg-[#13131c] p-4 rounded-2xl border border-zinc-800">
                <div className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-zinc-800/80 pb-2">
                  <span>بيانات المركبة</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1 sm:col-span-1">
                    <label className="text-xs font-semibold text-zinc-300 block">موديل ونوع السيارة</label>
                    <input
                      type="text"
                      required
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      placeholder="مثال: هيونداي سوناتا"
                      className="w-full bg-[#1b1b26] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E50914]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-300 block">سنة الصنع</label>
                    <select
                      value={carYear}
                      onChange={(e) => setCarYear(e.target.value)}
                      className="w-full bg-[#1b1b26] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E50914]"
                    >
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-300 block">رقم اللوحة</label>
                    <input
                      type="text"
                      required
                      value={plateNumber}
                      onChange={(e) => setPlateNumber(e.target.value)}
                      placeholder="40 - 12345"
                      className="w-full bg-[#1b1b26] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E50914] font-mono"
                    />
                  </div>
                </div>

                {/* Simulated Document Upload Box */}
                <div className="border border-dashed border-zinc-700 rounded-xl p-3 text-center bg-zinc-900/40 hover:bg-zinc-900/70 cursor-pointer transition-colors">
                  <Upload className="w-5 h-5 text-[#E50914] mx-auto mb-1" />
                  <span className="text-xs text-zinc-300 block font-semibold">
                    انقر لرفع رخصة القيادة ورخصة المركبة (اختياري الآن)
                  </span>
                  <span className="text-[10px] text-zinc-500">JPG, PNG, PDF بحد أقصى 10MB</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#E50914] hover:bg-[#c90812] text-white py-3.5 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(229,9,20,0.5)] hover:shadow-[0_0_30px_rgba(229,9,20,0.8)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>إرسال طلب الانضمام ككابتن نشاما</span>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
