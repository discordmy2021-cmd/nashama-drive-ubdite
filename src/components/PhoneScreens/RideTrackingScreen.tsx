import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Share2, MapPin, Navigation, Shield, Star, RefreshCw } from 'lucide-react';
import { Driver } from '../../types';

interface RideTrackingScreenProps {
  driver: Driver;
  onOpenChat: () => void;
  onOpenCall: () => void;
}

export const RideTrackingScreen: React.FC<RideTrackingScreenProps> = ({
  driver,
  onOpenChat,
  onOpenCall
}) => {
  // Car position along route (0 to 100%)
  const [progress, setProgress] = useState(38);
  const [isPlaying, setIsPlaying] = useState(true);
  const [etaMinutes, setEtaMinutes] = useState(6);
  const [distanceKm, setDistanceKm] = useState(2.7);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return 15;
        const next = prev + 1.2;
        const remainingFraction = (100 - next) / 100;
        setEtaMinutes(Math.max(1, Math.round(remainingFraction * 10)));
        setDistanceKm(parseFloat((remainingFraction * 4.2).toFixed(1)));
        return next;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Interpolated car position coordinates on curved SVG route
  // Path goes from top-left (pickup) curving around center to bottom-right (destination)
  const pathT = progress / 100;
  // Bezier curve approximation
  const p0 = { x: 50, y: 70 };
  const p1 = { x: 190, y: 90 };
  const p2 = { x: 110, y: 190 };
  const p3 = { x: 230, y: 220 };

  // Cubic bezier point
  const cx =
    Math.pow(1 - pathT, 3) * p0.x +
    3 * Math.pow(1 - pathT, 2) * pathT * p1.x +
    3 * (1 - pathT) * Math.pow(pathT, 2) * p2.x +
    Math.pow(pathT, 3) * p3.x;

  const cy =
    Math.pow(1 - pathT, 3) * p0.y +
    3 * Math.pow(1 - pathT, 2) * pathT * p1.y +
    3 * (1 - pathT) * Math.pow(pathT, 2) * p2.y +
    Math.pow(pathT, 3) * p3.y;

  return (
    <div className="flex flex-col h-full bg-[#0d0d12] text-white select-none text-right font-['Cairo'] relative overflow-hidden">
      
      {/* Top App Bar inside Phone Mockup */}
      <div className="pt-2 px-3 pb-2 flex items-center justify-between border-b border-zinc-800/80 bg-[#121218]/90 z-20">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-zinc-300">رحلة نشطة</span>
        </div>
        <div className="text-center font-bold text-xs text-white">
          تتبع السائق
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          title="محاكاة حركة السيارة"
          className="p-1 rounded bg-zinc-800/90 text-zinc-300 hover:text-white hover:bg-zinc-700 text-[10px] flex items-center gap-1"
        >
          <RefreshCw className={`w-3 h-3 ${isPlaying ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Interactive Map Area */}
      <div className="relative flex-1 bg-[#101016] overflow-hidden min-h-[170px]">
        
        {/* Stylized vector dark map background */}
        <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          {/* Grid street layout */}
          <line x1="0" y1="40" x2="300" y2="40" stroke="#252533" strokeWidth="3" />
          <line x1="0" y1="120" x2="300" y2="120" stroke="#252533" strokeWidth="4" />
          <line x1="0" y1="200" x2="300" y2="200" stroke="#252533" strokeWidth="3" />
          <line x1="70" y1="0" x2="70" y2="300" stroke="#252533" strokeWidth="3" />
          <line x1="160" y1="0" x2="160" y2="300" stroke="#252533" strokeWidth="5" />
          <line x1="240" y1="0" x2="240" y2="300" stroke="#252533" strokeWidth="3" />

          {/* Secondary streets */}
          <line x1="20" y1="80" x2="280" y2="160" stroke="#1d1d28" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="120" y1="0" x2="280" y2="240" stroke="#1d1d28" strokeWidth="2" />
        </svg>

        {/* Route Line SVG with Neon Red Glow */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Route path backdrop glow */}
          <path
            d="M 50 70 C 190 90, 110 190, 230 220"
            fill="none"
            stroke="#E50914"
            strokeWidth="5"
            strokeLinecap="round"
            className="opacity-40 blur-[2px]"
          />
          {/* Main Route path */}
          <path
            d="M 50 70 C 190 90, 110 190, 230 220"
            fill="none"
            stroke="#E50914"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Origin Pin (Pick up point) */}
          <g transform="translate(50, 70)">
            <circle cx="0" cy="0" r="8" fill="#E50914" fillOpacity="0.2" className="animate-ping" />
            <circle cx="0" cy="0" r="5" fill="#E50914" stroke="#ffffff" strokeWidth="2" />
          </g>

          {/* Destination Pin (بوليفارد العبدلي) */}
          <g transform="translate(230, 220)">
            <circle cx="0" cy="0" r="10" fill="#22c55e" fillOpacity="0.25" className="animate-ping" />
            <circle cx="0" cy="0" r="6" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
          </g>
        </svg>

        {/* Animated Moving Car Icon along route */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none z-10"
          style={{ left: `${cx}px`, top: `${cy}px` }}
        >
          <div className="relative">
            {/* Red radar pulse ring */}
            <div className="absolute -inset-2 rounded-full bg-red-600/30 radar-ring" />
            <div className="w-8 h-8 rounded-full bg-zinc-950 border-2 border-[#E50914] shadow-[0_0_12px_rgba(229,9,20,0.9)] flex items-center justify-center text-white transform -rotate-45">
              <Navigation className="w-4 h-4 fill-[#E50914] text-[#E50914]" />
            </div>
          </div>
        </div>

        {/* Floating ETA Badge inside map */}
        <div className="absolute top-2 left-2 bg-[#09090c]/90 border border-zinc-700/80 rounded-xl px-2.5 py-1 text-left backdrop-blur-md shadow-lg z-10">
          <div className="text-[10px] text-zinc-400">الوقت المقدر</div>
          <div className="text-xs font-black text-[#E50914] flex items-center gap-1">
            <span>{etaMinutes} دقائق</span>
          </div>
        </div>

        <div className="absolute top-2 right-2 bg-[#09090c]/90 border border-zinc-700/80 rounded-xl px-2.5 py-1 text-right backdrop-blur-md shadow-lg z-10">
          <div className="text-[10px] text-zinc-400">المسافة</div>
          <div className="text-xs font-bold text-white">{distanceKm} كم</div>
        </div>
      </div>

      {/* Driver Card Overlay */}
      <div className="bg-[#121218] border-t border-zinc-800 p-3 space-y-2.5 z-20">
        
        {/* Driver identity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={driver.avatar}
                alt={driver.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-red-600"
              />
              <span className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 rounded-full w-3.5 h-3.5 border-2 border-[#121218] flex items-center justify-center">
                <Shield className="w-2 h-2 text-white" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-xs text-white">{driver.name}</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-950 text-red-300 font-bold border border-red-800/60">
                  كابتن نشاما
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-zinc-400">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-white font-bold">{driver.rating}</span>
                <span>({driver.reviewsCount} تقييم)</span>
              </div>
            </div>
          </div>

          {/* Car details */}
          <div className="text-left">
            <div className="text-[11px] font-bold text-white">{driver.carModel}</div>
            <div className="inline-block mt-0.5 px-2 py-0.5 bg-zinc-900 border border-zinc-700 text-zinc-200 text-[10px] font-mono rounded tracking-wider">
              {driver.plateNumber}
            </div>
          </div>
        </div>

        {/* Quick Communication Actions (Chat & Call) */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            onClick={onOpenChat}
            className="flex items-center justify-center gap-1 py-1.5 px-2 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white rounded-xl text-[11px] font-semibold border border-zinc-700/60 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#E50914]" />
            <span>مراسلة</span>
          </button>

          <button
            onClick={onOpenCall}
            className="flex items-center justify-center gap-1 py-1.5 px-2 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white rounded-xl text-[11px] font-semibold border border-zinc-700/60 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>اتصال</span>
          </button>

          <button
            onClick={() => alert('تم نسخ رابط تتبع الرحلة لمشاركته مع العائلة والأصدقاء')}
            className="flex items-center justify-center gap-1 py-1.5 px-2 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white rounded-xl text-[11px] font-semibold border border-zinc-700/60 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-zinc-400" />
            <span>مشاركة</span>
          </button>
        </div>

        {/* Trip Destination Snippet */}
        <div className="bg-[#181822] rounded-xl p-2 flex items-center justify-between text-[11px] border border-zinc-800">
          <div className="flex items-center gap-1.5 text-zinc-300 truncate max-w-[170px]">
            <MapPin className="w-3.5 h-3.5 text-[#E50914] flex-shrink-0" />
            <span className="truncate">بوليفارد العبدلي، عمان</span>
          </div>
          <span className="text-[#E50914] font-black font-mono">3.50 د.أ</span>
        </div>

      </div>

      {/* Red Action Button at Bottom of Mockup */}
      <div className="p-2.5 bg-[#0e0e14] border-t border-zinc-800">
        <button
          onClick={() => alert('الرحلة قيد التنفيذ، السائق يقترب منك')}
          className="w-full bg-[#E50914] hover:bg-[#c90812] text-white py-2 rounded-xl text-xs font-bold shadow-md transition-colors"
        >
          تفاصيل الرحلة المباشرة
        </button>
      </div>

    </div>
  );
};
