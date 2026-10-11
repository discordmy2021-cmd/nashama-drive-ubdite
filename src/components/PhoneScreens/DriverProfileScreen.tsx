import React, { useState } from 'react';
import { Star, ShieldCheck, ChevronRight, Check, Award, Clock } from 'lucide-react';
import { Driver } from '../../types';
import confetti from 'canvas-confetti';

interface DriverProfileScreenProps {
  driver: Driver;
  onBookRide?: () => void;
}

export const DriverProfileScreen: React.FC<DriverProfileScreenProps> = ({
  driver,
  onBookRide
}) => {
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = () => {
    setIsBooked(true);
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
    if (onBookRide) onBookRide();
    setTimeout(() => {
      setIsBooked(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0d12] text-white select-none text-right font-['Cairo'] relative overflow-hidden">
      
      {/* Top phone header */}
      <div className="pt-2 px-3 pb-2 flex items-center justify-between border-b border-zinc-800 bg-[#121218]">
        <span className="text-zinc-500 hover:text-white cursor-pointer">
          <ChevronRight className="w-4 h-4" />
        </span>
        <div className="text-xs font-black tracking-wide text-white">
          <span className="text-[#E50914]">نشاما</span> درايف
        </div>
        <span className="w-4" />
      </div>

      {/* Screen Body */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5">
        
        {/* Driver Photo & Verification Badge */}
        <div className="flex flex-col items-center justify-center pt-1 text-center">
          <div className="relative mb-2">
            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#E50914] via-amber-400 to-red-500 shadow-[0_0_20px_rgba(229,9,20,0.5)]">
              <img
                src={driver.avatar}
                alt={driver.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-[#0d0d12]">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <h3 className="text-base font-extrabold text-white flex items-center gap-1.5">
            <span>{driver.name}</span>
          </h3>

          {/* 5 Golden Stars Rating */}
          <div className="flex items-center gap-1 mt-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs font-bold text-white mr-1.5">{driver.rating}</span>
            <span className="text-[11px] text-zinc-400">({driver.reviewsCount} تقييم)</span>
          </div>

          {/* Driver mini badges */}
          <div className="flex items-center gap-2 mt-2">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-zinc-300 border border-zinc-700">
              <Award className="w-3 h-3 text-[#E50914]" />
              <span>كابتن ماسي</span>
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-zinc-300 border border-zinc-700">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>+1,400 رحلة</span>
            </span>
          </div>
        </div>

        {/* Route Details Card */}
        <div className="bg-[#15151e] border border-zinc-800 rounded-2xl p-3 space-y-2.5">
          <div className="text-[11px] font-bold text-zinc-400 border-b border-zinc-800/80 pb-1.5 flex items-center justify-between">
            <span>مسار الرحلة المقترح</span>
            <span className="text-emerald-400 font-mono text-[10px]">جاهز للانطلاق</span>
          </div>

          {/* Pickup and Dropoff timeline */}
          <div className="space-y-2 text-xs relative pr-5">
            {/* Connecting vertical line */}
            <div className="absolute right-2 top-2 bottom-2 w-0.5 bg-zinc-700" />

            {/* Point A */}
            <div className="relative">
              <div className="absolute -right-5 top-1 w-2.5 h-2.5 rounded-full bg-[#E50914] border-2 border-[#15151e]" />
              <div className="text-[10px] text-zinc-400">نقطة الانطلاق</div>
              <div className="font-semibold text-white truncate">عمان - دوار الداخلية</div>
            </div>

            {/* Point B */}
            <div className="relative">
              <div className="absolute -right-5 top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#15151e]" />
              <div className="text-[10px] text-zinc-400">وجهة الوصول</div>
              <div className="font-semibold text-white truncate">بوليفارد العبدلي</div>
            </div>
          </div>
        </div>

        {/* Vehicle & Price Summary */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-[#15151e] border border-zinc-800 rounded-xl p-2.5">
            <span className="text-[10px] text-zinc-400 block">المركبة</span>
            <span className="text-xs font-bold text-white block mt-0.5">{driver.carModel}</span>
            <span className="text-[9px] text-zinc-500">{driver.plateNumber}</span>
          </div>

          <div className="bg-[#15151e] border border-zinc-800 rounded-xl p-2.5">
            <span className="text-[10px] text-zinc-400 block">التكلفة التقديرية</span>
            <span className="text-sm font-black text-[#E50914] block mt-0.5 font-mono">
              3.50 د.أ
            </span>
            <span className="text-[9px] text-emerald-400">سعر ثابت ومضمون</span>
          </div>
        </div>

      </div>

      {/* Red Action Button at Bottom */}
      <div className="p-3 bg-[#111116] border-t border-zinc-800">
        <button
          onClick={handleBooking}
          disabled={isBooked}
          className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-1.5 ${
            isBooked
              ? 'bg-emerald-600 text-white'
              : 'bg-[#E50914] hover:bg-[#c90812] text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]'
          }`}
        >
          {isBooked ? (
            <>
              <Check className="w-4 h-4" />
              <span>تم تأكيد الحجز بنجاح!</span>
            </>
          ) : (
            <span>تأكيد الحجز الآن</span>
          )}
        </button>
      </div>

    </div>
  );
};
