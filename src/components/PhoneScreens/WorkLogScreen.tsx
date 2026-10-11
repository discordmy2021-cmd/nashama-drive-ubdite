import React, { useState } from 'react';
import { mockRecentTrips } from '../../data/mockData';
import { Driver } from '../../types';
import { TrendingUp, Award, Calendar, CheckCircle, ChevronLeft } from 'lucide-react';

interface WorkLogScreenProps {
  driver: Driver;
}

export const WorkLogScreen: React.FC<WorkLogScreenProps> = ({ driver }) => {
  const [selectedFilter, setSelectedFilter] = useState<'today' | 'week'>('today');

  return (
    <div className="flex flex-col h-full bg-[#0d0d12] text-white select-none text-right font-['Cairo'] relative overflow-hidden">
      
      {/* Top phone header */}
      <div className="pt-2 px-3 pb-2 flex items-center justify-between border-b border-zinc-800 bg-[#121218]">
        <span className="text-[10px] text-zinc-400 font-mono">اليوم</span>
        <div className="text-xs font-black tracking-wide text-white">
          <span>WorkLog</span>
          <span className="text-zinc-400 text-[10px] font-normal mr-1">| سجل العمل</span>
        </div>
        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
      </div>

      {/* Screen Body */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3">
        
        {/* Top KPIs Summary matching screenshot */}
        <div className="grid grid-cols-2 gap-2">
          {/* Acceptance Rate */}
          <div className="bg-[#15151e] border border-zinc-800 rounded-2xl p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-zinc-400">نسبة القبول</span>
              <Award className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-lg font-black text-emerald-400 font-mono mt-1">
              %{driver.acceptanceRate}
            </div>
            <div className="text-[9px] text-zinc-400">أعلى من المتوسط</div>
          </div>

          {/* Completed Trips */}
          <div className="bg-[#15151e] border border-zinc-800 rounded-2xl p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-zinc-400">إجمالي الرحلات</span>
              <TrendingUp className="w-3.5 h-3.5 text-[#E50914]" />
            </div>
            <div className="text-lg font-black text-white font-mono mt-1">
              +{driver.completedTrips}
            </div>
            <div className="text-[9px] text-zinc-400">سجل قيادة ممتاز</div>
          </div>
        </div>

        {/* Filter Toggle: اليوم / الأسبوع */}
        <div className="flex bg-zinc-900 p-0.5 rounded-xl border border-zinc-800 text-[10px]">
          <button
            onClick={() => setSelectedFilter('today')}
            className={`flex-1 py-1 rounded-lg font-bold transition-all ${
              selectedFilter === 'today'
                ? 'bg-[#181824] text-white shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            رحلات اليوم (12)
          </button>
          <button
            onClick={() => setSelectedFilter('week')}
            className={`flex-1 py-1 rounded-lg font-bold transition-all ${
              selectedFilter === 'week'
                ? 'bg-[#181824] text-white shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            هذا الأسبوع
          </button>
        </div>

        {/* Recent Trips Feed */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-zinc-400 flex items-center justify-between">
            <span>آخر المشاوير المنجزة</span>
            <span className="text-[10px] text-[#E50914]">سجل فوري</span>
          </div>

          {mockRecentTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-[#15151e] border border-zinc-800/80 hover:border-zinc-700 rounded-xl p-2.5 transition-colors text-right"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-zinc-400">{trip.time}</span>
                <span className="font-mono font-bold text-emerald-400">{trip.fare.toFixed(2)} د.أ</span>
              </div>
              
              <div className="mt-1 text-[11px] text-zinc-200 truncate">
                {trip.from} ➔ {trip.to}
              </div>

              <div className="mt-1 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1 text-amber-400">
                  <span>★</span>
                  <span>{trip.rating}</span>
                </div>
                <span className="text-emerald-400 flex items-center gap-0.5">
                  <CheckCircle className="w-2.5 h-2.5" />
                  <span>{trip.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Red Action Button at Bottom */}
      <div className="p-2.5 bg-[#111116] border-t border-zinc-800">
        <button
          onClick={() => alert('تم تحميل كشف الحساب والتقارير الشهرية')}
          className="w-full bg-[#E50914] hover:bg-[#c90812] text-white py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
        >
          <span>تصدير تقرير المشاوير</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
