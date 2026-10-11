import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, ChevronRight, Phone, KeyRound } from 'lucide-react';
import { Driver } from '../../types';

interface DriverVerifyScreenProps {
  driver: Driver;
  onVerified?: () => void;
}

export const DriverVerifyScreen: React.FC<DriverVerifyScreenProps> = ({
  driver,
  onVerified
}) => {
  const [phone, setPhone] = useState('079-5847923');
  const [driverId, setDriverId] = useState('ND-1845');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      if (onVerified) onVerified();
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0d12] text-white select-none text-right font-['Cairo'] relative overflow-hidden">
      
      {/* Top phone header */}
      <div className="pt-2 px-3 pb-2 flex items-center justify-between border-b border-zinc-800 bg-[#121218]">
        <ChevronRight className="w-4 h-4 text-zinc-500 cursor-pointer" />
        <div className="text-xs font-black tracking-wide text-white">
          <span className="text-[#E50914]">نشاما</span> درايف
        </div>
        <span className="w-4" />
      </div>

      {/* Screen Form Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        
        {/* Brand Header Icon */}
        <div className="text-center space-y-1">
          <div className="inline-flex p-2.5 rounded-2xl bg-red-950/40 border border-red-800/40 text-[#E50914] shadow-inner mb-1">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-white">تسجيل وتحقق كابتن</h4>
          <p className="text-[11px] text-zinc-400">أدخل بيانات الاعتماد للوصول إلى لوحة السائق</p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleVerify} className="space-y-3">
          
          {/* Driver Phone Number */}
          <div className="space-y-1 text-right">
            <label className="text-[11px] font-bold text-zinc-300 block">
              رقم هاتف السائق
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="079-XXXXXXX"
                className="w-full bg-[#16161e] border border-zinc-800 rounded-xl py-2 px-3 pr-8 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50914] font-mono"
              />
              <Phone className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-2.5" />
            </div>
          </div>

          {/* Driver ID Number */}
          <div className="space-y-1 text-right">
            <label className="text-[11px] font-bold text-zinc-300 block">
              معرّف السائق
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                placeholder="ND-1845"
                className="w-full bg-[#16161e] border border-zinc-800 rounded-xl py-2 px-3 pr-8 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50914] font-mono tracking-wider"
              />
              <KeyRound className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-2.5" />
            </div>
          </div>

          {/* Red Action Verify Button */}
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full bg-[#E50914] hover:bg-[#c90812] text-white py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            {isVerifying ? (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>تم التحقق بنجاح</span>
              </>
            ) : (
              <span>تحقق</span>
            )}
          </button>
        </form>

        {/* Preview Card below matching screenshot: السائق المختار */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[11px] font-bold text-zinc-400">السائق المختار:</div>
          <div className="bg-[#15151e] border border-zinc-800 rounded-2xl p-2.5 flex items-center gap-2.5">
            <img
              src={driver.avatar}
              alt={driver.name}
              className="w-10 h-10 rounded-full object-cover border border-red-600/80"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">{driver.name}</span>
                <span className="text-[9px] text-emerald-400 font-mono bg-emerald-950/50 px-1.5 py-0.2 rounded border border-emerald-800/40">
                  معتمد نشاما
                </span>
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">
                كود الاعتماد: <span className="font-mono text-zinc-300">{driver.id}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
