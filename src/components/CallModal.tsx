import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Volume2, ShieldCheck } from 'lucide-react';
import { Driver } from '../types';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver;
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose, driver }) => {
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setSeconds(0);
      return;
    }
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#0e0e14] border border-zinc-800 rounded-3xl shadow-2xl p-6 font-['Cairo'] text-center flex flex-col items-center">
        
        {/* Call Security Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold mb-6">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>مكالمة آمنة ومحمية برقم افتراضي</span>
        </div>

        {/* Driver Photo with Pulse Ring */}
        <div className="relative mb-4">
          <div className="absolute -inset-3 rounded-full bg-red-600/20 animate-ping" />
          <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[#E50914] to-red-600 shadow-[0_0_25px_rgba(229,9,20,0.6)]">
            <img
              src={driver.avatar}
              alt={driver.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* Driver info */}
        <h3 className="text-xl font-bold text-white">{driver.name}</h3>
        <p className="text-xs text-zinc-400 mt-0.5">{driver.carModel} • {driver.plateNumber}</p>

        {/* Call Status & Timer */}
        <div className="mt-4 text-sm font-mono font-bold text-emerald-400 bg-[#151520] px-4 py-1.5 rounded-full border border-zinc-800">
          {formatTime(seconds)}
        </div>

        {/* Simulated Soundwaves */}
        <div className="flex items-center justify-center gap-1.5 h-10 my-6">
          {[40, 75, 95, 60, 30, 85, 50, 90, 45, 65].map((height, i) => (
            <div
              key={i}
              className="w-1 bg-[#E50914] rounded-full transition-all duration-300 animate-pulse"
              style={{
                height: `${height}%`,
                animationDelay: `${i * 100}ms`
              }}
            />
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-5 w-full pt-2">
          {/* Mute button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isMuted ? 'bg-red-950 text-red-400 border border-red-700' : 'bg-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* End Call Button */}
          <button
            onClick={onClose}
            className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-[0_0_25px_rgba(220,38,38,0.7)] transition-transform hover:scale-105 cursor-pointer"
          >
            <PhoneOff className="w-7 h-7" />
          </button>

          {/* Speaker button */}
          <button
            onClick={() => setSpeakerOn(!speakerOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              speakerOn ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
