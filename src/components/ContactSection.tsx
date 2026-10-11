import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';

export const ContactSection: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const faqs = [
    {
      q: 'كيف يتم احتساب تسعيرة المشاوير في نشاما درايف؟',
      a: 'تعتمد التسعيرة على تسعيرة عادلة مبنية على المسافة المقطوعة والوقت المقدر للمشوار، وتظهر لك التكلفة بوضوح تام قبل تأكيد الحجز وبدون أية رسوم خفية.'
    },
    {
      q: 'ما هي الشروط المطلوبة للتسجيل ككابتن نشاما؟',
      a: 'رخصة قيادة سارية المفعول، سيارة حديثة بحالة ممتازة ونظيفة، عدم وجود أسبقيات أمنية (عدم محكومية)، وهاتف ذكي بنظام أندرويد أو iOS.'
    },
    {
      q: 'هل يمكنني الدفع نقداً (كاش) أم عبر المحفظة والبطاقات فقط؟',
      a: 'نوفر لك حرية الاختيار التامة: الدفع نقداً مباشرة للكابتن، أو عبر البطاقات الائتمانية والبنكية، أو عبر محفظة نشاما الإلكترونية أو كليك CliQ.'
    },
    {
      q: 'ما هي إجراءات الأمان المتبعة أثناء الرحلات؟',
      a: 'جميع الرحلات مراقبة بتقنية الـ GPS لحظة بلحظة، يمكنك مشاركة رابط المسار الحي مع أفراد عائلتك بنقرة زر واحدة، وزر اتصال طوارئ متاح طوال وقت الرحلة.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact-section" className="py-20 bg-[#08080a] relative border-t border-zinc-900 text-right pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-[#E50914] tracking-wider uppercase">في خدمتكم دائماً</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Cairo'] tracking-tight">
            تواصل معنا والأسئلة الشائعة
          </h2>
          <p className="text-sm text-zinc-400">
            فريق دعم نشاما درايف جاهز للإجابة على استفساراتكم على مدار الساعة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* FAQ Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2 justify-end">
              <span>الأسئلة الأكثر تكراراً</span>
              <HelpCircle className="w-5 h-5 text-[#E50914]" />
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#111118] border border-zinc-800/80 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-4 flex items-center justify-between text-right text-xs sm:text-sm font-bold text-white hover:text-red-400 transition-colors"
                    >
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? 'rotate-180 text-[#E50914]' : ''
                        }`}
                      />
                      <span className="mr-2">{faq.q}</span>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-zinc-300 border-t border-zinc-800/50 leading-relaxed font-normal animate-in fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6">
              <div className="bg-[#111118] border border-zinc-800 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-800/50 flex items-center justify-center text-[#E50914]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block">مركز الاتصال الموحد</span>
                  <span className="text-xs font-bold text-white font-mono dir-ltr block text-right">+962 6 500 0000</span>
                </div>
              </div>

              <div className="bg-[#111118] border border-zinc-800 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-800/50 flex items-center justify-center text-[#E50914]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block">البريد الإلكتروني</span>
                  <span className="text-xs font-bold text-white block">support@nashama.jo</span>
                </div>
              </div>

              <div className="bg-[#111118] border border-zinc-800 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-800/50 flex items-center justify-center text-[#E50914]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block">المقر الرئيسي</span>
                  <span className="text-xs font-bold text-white block">بوليفارد العبدلي، عمان</span>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Message Form (5 cols) */}
          <div className="lg:col-span-5 bg-[#101016] border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-1">أرسل لنا استفسارك</h3>
            <p className="text-xs text-zinc-400 mb-5">
              يسعدنا الاستماع لآرائكم ومساعدتكم في أي وقت
            </p>

            {formSent ? (
              <div className="p-6 text-center space-y-3 bg-emerald-950/50 border border-emerald-500/40 rounded-2xl">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">تم استلام رسالتك بنجاح!</h4>
                <p className="text-xs text-zinc-300">سيتواصل معك أحد مسؤولي خدمة العملاء في أقرب وقت.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300 block">الاسم</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="اسمك الكريم"
                    className="w-full bg-[#171722] border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300 block">رقم الهاتف</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="079-XXXXXXX"
                    className="w-full bg-[#171722] border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E50914] font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300 block">نص الرسالة أو الاستفسار</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="اكتب استفسارك هنا بالتفصيل..."
                    className="w-full bg-[#171722] border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E50914] hover:bg-[#c90812] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 transform rotate-180" />
                  <span>إرسال الرسالة</span>
                </button>
              </form>
            )}

            {/* Mini Footer Logo */}
            <div className="mt-6 pt-5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
              <span>جميع الحقوق محفوظة © {new Date().getFullYear()}</span>
              <Logo size="sm" showSlogan={false} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
