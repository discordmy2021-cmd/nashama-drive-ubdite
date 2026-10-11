import React, { useState } from 'react';
import { X, Wallet, ArrowDownLeft, Plus, Shield, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance?: number;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  balance = 24.50
}) => {
  const [currentBalance, setCurrentBalance] = useState(balance);
  const [topUpAmount, setTopUpAmount] = useState('10');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleTopUp = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(topUpAmount);
    if (isNaN(val) || val <= 0) return;

    setCurrentBalance((prev) => prev + val);
    setIsSuccess(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
    setTimeout(() => setIsSuccess(false), 3000);
  };

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
            <h3 className="text-base font-bold text-white">محفظة نشاما الذكية</h3>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          
          {/* Balance card */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-[#E50914] via-[#b91c1c] to-[#7f1d1d] text-white shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-red-200">
              <span className="font-mono">NASHAMA WALLET</span>
              <Shield className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <span className="text-xs text-red-100">الرصيد الكلي المتوفر:</span>
              <div className="text-3xl font-black font-mono mt-1">
                {currentBalance.toFixed(2)} <span className="text-sm font-normal">د.أ</span>
              </div>
            </div>
          </div>

          {/* Top up alert */}
          {isSuccess && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>تم شحن رصيدك بنجاح! الرصيد جاهز للاستخدام.</span>
            </div>
          )}

          {/* Quick Top up buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300 block">شحن سريع للمحفظة:</label>
            <div className="grid grid-cols-4 gap-2">
              {['5', '10', '20', '50'].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTopUpAmount(amt)}
                  className={`py-2 rounded-xl text-xs font-bold font-mono border transition-all ${
                    topUpAmount === amt
                      ? 'bg-[#E50914] border-[#E50914] text-white shadow'
                      : 'bg-[#15151e] border-zinc-800 text-zinc-300 hover:text-white'
                  }`}
                >
                  {amt} د.أ
                </button>
              ))}
            </div>

            <form onSubmit={handleTopUp} className="pt-2">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>إتمام شحن المحفظة ({topUpAmount} د.أ)</span>
              </button>
            </form>
          </div>

          {/* Payment Gateways Info */}
          <div className="text-center text-[10px] text-zinc-400 border-t border-zinc-800/80 pt-3 flex items-center justify-center gap-3">
            <span>دعم فوري: Apple Pay</span>
            <span>•</span>
            <span>بطاقات Visa / MasterCard</span>
            <span>•</span>
            <span>كليك CliQ الأردن</span>
          </div>

          {/* Recent Operations */}
          <div className="space-y-1.5 pt-1">
            <span className="text-xs font-bold text-zinc-400 block">آخر الحركات المالية:</span>
            <div className="space-y-1.5 text-xs">
              <div className="bg-[#14141e] p-2.5 rounded-xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-white block font-medium">مشوار: بوليفارد العبدلي</span>
                  <span className="text-[10px] text-zinc-400">أمس 18:45</span>
                </div>
                <span className="text-red-400 font-mono font-bold">-3.50 د.أ</span>
              </div>
              <div className="bg-[#14141e] p-2.5 rounded-xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-white block font-medium">شحن محفظة عبر CliQ</span>
                  <span className="text-[10px] text-zinc-400">منذ 3 أيام</span>
                </div>
                <span className="text-emerald-400 font-mono font-bold flex items-center gap-0.5">
                  <ArrowDownLeft className="w-3.5 h-3.5" />
                  +15.00 د.أ
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
