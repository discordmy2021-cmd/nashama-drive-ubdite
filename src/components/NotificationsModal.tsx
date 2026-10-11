import React from 'react';
import { X, Bell, Tag, Sparkles, CheckCheck } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'خصم نهاية الأسبوع 20%',
      desc: 'استخدم الكود NASHAMA20 واستمتع بخصم 20% على مشاويرك في عمان وإربد.',
      time: 'منذ ساعتين',
      icon: Tag,
      color: 'text-[#E50914]'
    },
    {
      id: '2',
      title: 'رصيد ترحيبي في محفظتك',
      desc: 'تم إضافة 3.00 د.أ إلى رصيد نشاما الخاص بك، استمتع بمشوارك القادم!',
      time: 'منذ 5 ساعات',
      icon: Sparkles,
      color: 'text-amber-400'
    },
    {
      id: '3',
      title: 'تم اكتمال مشوارك بنجاح',
      desc: 'شكراً لاختيارك نشاما درايف! يمكنك تقييم الكابتن محمود علي الآن.',
      time: 'أمس',
      icon: CheckCheck,
      color: 'text-emerald-400'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0e0e14] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden font-['Cairo'] text-right">
        
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-[#14141d]">
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-right flex items-center gap-2">
            <h3 className="text-base font-bold text-white">مركز الإشعارات والعروض</h3>
            <Bell className="w-4 h-4 text-[#E50914]" />
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3 max-h-[420px] overflow-y-auto">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className="bg-[#14141e] hover:bg-[#1a1a27] border border-zinc-800 rounded-2xl p-3.5 transition-colors text-right space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500 font-mono">{n.time}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-white">{n.title}</span>
                    <Icon className={`w-3.5 h-3.5 ${n.color}`} />
                  </div>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{n.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#111118] border-t border-zinc-800 text-center">
          <button
            onClick={onClose}
            className="text-xs text-zinc-400 hover:text-white font-semibold transition-colors"
          >
            تحديد الكل كمقروء وإغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
