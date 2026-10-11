import React, { useState } from 'react';
import { Power, Car, MoreHorizontal, Bell, DollarSign, CheckCircle2 } from 'lucide-react';
import { Driver } from '../../types';

interface DriverDashboardScreenProps {
  driver: Driver;
}

export const DriverDashboardScreen: React.FC<DriverDashboardScreenProps> = ({
  driver
}) => {
  const [isOnline, setIsOnline] = useState(driver.isOnline);
  const [incomingOrder, setIncomingOrder] = useState<boolean>(false);
  const [balance, setBalance] = useState(driver.totalBalance);
  const [tripsCount, setTripsCount] = useState(driver.todayTrips);

  const toggleStatus = () => {
    setIsOnline(!isOnline);
  };

  const triggerMockOrder = () => {
    setIncomingOrder(true);
  };

  const acceptMockOrder = () => {
    setIncomingOrder(false);
    setTripsCount((prev) => prev + 1);
    setBalance((prev) => prev + 4.5);
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0d12] text-white select-none text-right font-['Cairo'] relative overflow-hidden">
      
      {/* Top phone header */}
      <div className="pt-2 px-3 pb-2 flex items-center justify-between border-b border-zinc-800 bg-[#121218]">
        <button
          onClick={toggleStatus}
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${
            isOnline
              ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300'
              : 'bg-zinc-800 border-zinc-700 text-zinc-400'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-ping' : 'bg-zinc-500'}`} />
          <span>{isOnline ? 'متصل وجاهز' : 'غير متصل'}</span>
        </button>

        <div className="text-xs font-black tracking-wide text-white">
          <span className="text-[#E50914]">نشاما</span> درايف
        </div>

        <button
          onClick={triggerMockOrder}
          title="محاكاة طلب جديد"
          className="relative p-1 text-zinc-400 hover:text-white"
        >
          <Bell className="w-4 h-4 text-amber-400" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#E50914] rounded-full" />
        </button>
      </div>

      {/* Screen Body */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 relative">
        
        {/* Incoming Order Simulation Banner if active */}
        {incomingOrder && (
          <div className="bg-red-950/90 border border-red-500/80 rounded-2xl p-2.5 space-y-2 animate-bounce">
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span className="flex items-center gap-1 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                طلب جديد قريب منك!
              </span>
              <span className="font-mono text-emerald-400 text-sm">4.50 د.أ</span>
            </div>
            <div className="text-[11px] text-zinc-300">
              من: عبدون الشمالي ➔ إلى: تاج مول (3.2 كم)
            </div>
            <div className="flex gap-2">
              <button
                onClick={acceptMockOrder}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-1.5 rounded-xl text-xs font-bold transition-colors"
              >
                قبول المشوار
              </button>
              <button
                onClick={() => setIncomingOrder(false)}
                className="px-3 bg-zinc-800 text-zinc-400 hover:text-white py-1.5 rounded-xl text-xs"
              >
                تخطي
              </button>
            </div>
          </div>
        )}

        {/* Primary Crimson Balance Card matching screenshot */}
        <div className="relative rounded-2xl overflow-hidden p-4 bg-gradient-to-br from-[#E50914] via-[#b91c1c] to-[#7f1d1d] shadow-[0_10px_25px_-5px_rgba(229,9,20,0.5)]">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs text-red-100 font-medium">الرصيد المتاح</span>
              <div className="text-2xl font-black text-white font-mono mt-0.5 tracking-tight flex items-baseline gap-1">
                <span>{balance.toFixed(2)}</span>
                <span className="text-xs font-normal">د.أ</span>
              </div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-xl px-2 py-1 text-center">
              <span className="text-[9px] text-red-200 block">التقييم</span>
              <span className="text-xs font-bold text-amber-300">★ {driver.rating}</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-red-400/30 flex items-center justify-between text-xs">
            <span className="text-red-100">رحلات اليوم</span>
            <span className="bg-white/20 text-white font-bold px-2 py-0.5 rounded-full font-mono">
              {tripsCount} مشوار
            </span>
          </div>
        </div>

        {/* 3 Grid Actions matching screenshot */}
        <div className="grid grid-cols-3 gap-2">
          
          <button
            onClick={() => alert(`رحلات اليوم: ${tripsCount} مشوار مكتمل`)}
            className="bg-[#15151e] hover:bg-zinc-800 border border-zinc-800 rounded-xl p-2.5 flex flex-col items-center justify-center text-center transition-colors"
          >
            <DollarSign className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="text-[11px] font-bold text-white">الرحلات</span>
            <span className="text-[9px] text-zinc-400 font-mono">35.00 د.أ</span>
          </button>

          <button
            onClick={() => alert(`بيانات المركبة: ${driver.carModel} (${driver.plateNumber})`)}
            className="bg-[#15151e] hover:bg-zinc-800 border border-zinc-800 rounded-xl p-2.5 flex flex-col items-center justify-center text-center transition-colors"
          >
            <Car className="w-4 h-4 text-[#E50914] mb-1" />
            <span className="text-[11px] font-bold text-white">المركبات</span>
            <span className="text-[9px] text-zinc-400">سوناتا 2023</span>
          </button>

          <button
            onClick={() => alert('إعدادات كابتن نشاما والمحفظة والدعم الفني')}
            className="bg-[#15151e] hover:bg-zinc-800 border border-zinc-800 rounded-xl p-2.5 flex flex-col items-center justify-center text-center transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-zinc-400 mb-1" />
            <span className="text-[11px] font-bold text-white">المزيد</span>
            <span className="text-[9px] text-zinc-400">الإعدادات</span>
          </button>

        </div>

        {/* Quick Shift summary */}
        <div className="bg-[#15151e] border border-zinc-800 rounded-xl p-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-zinc-300">أرباح اليوم المحققة</span>
          </div>
          <span className="font-mono font-bold text-emerald-400">35.00 د.أ</span>
        </div>

      </div>

      {/* Red Action Button at Bottom */}
      <div className="p-3 bg-[#111116] border-t border-zinc-800">
        <button
          onClick={toggleStatus}
          className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
            isOnline
              ? 'bg-[#E50914] hover:bg-[#c90812] text-white shadow-[0_0_15px_rgba(229,9,20,0.5)]'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          <Power className="w-3.5 h-3.5" />
          <span>{isOnline ? 'إنهاء المناوبة والراحة' : 'بدء العمل وتلقي الطلبات'}</span>
        </button>
      </div>

    </div>
  );
};
