import React, { useState } from 'react';
import { X, MapPin, Navigation, Car, Shield, Check, Clock, CreditCard, Banknote } from 'lucide-react';
import { rideOptions, popularDestinations } from '../data/mockData';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRideBooked: (details: { pickup: string; destination: string; carType: string; price: number }) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onRideBooked
}) => {
  const [pickup, setPickup] = useState('عمان - دوار الداخلية');
  const [destination, setDestination] = useState('بوليفارد العبدلي');
  const [selectedOptionId, setSelectedOptionId] = useState('comfort');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'wallet'>('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const selectedTier = rideOptions.find((o) => o.id === selectedOptionId) || rideOptions[1];
  const estimatedPrice = (selectedTier.basePrice + 1.35).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }

      onRideBooked({
        pickup,
        destination,
        carType: selectedTier.nameAr,
        price: parseFloat(estimatedPrice)
      });

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2500);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0e0e14] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden font-['Cairo'] text-right">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-[#14141d]">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-right">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5 justify-end">
              <span>طلب رحلة نشاما فورية</span>
              <Car className="w-4 h-4 text-[#E50914]" />
            </h3>
            <p className="text-xs text-zinc-400">حدد وجهتك واختر فئة المركبة المفضلة</p>
          </div>
        </div>

        {/* Modal Body */}
        {success ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.5)]">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-black text-white">تم تأكيد طلبك بنجاح!</h4>
            <p className="text-sm text-zinc-300">
              الكابتن <strong className="text-white">محمود علي</strong> متجه إليك الآن في سيارة <strong className="text-white">هيونداي سوناتا</strong>.
            </p>
            <div className="inline-block px-3 py-1 rounded-full bg-red-950 border border-red-800 text-red-300 text-xs font-mono">
              الوقت المقدر للوصول: 4 دقائق
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5">
            
            {/* Route Inputs */}
            <div className="space-y-3 bg-[#13131c] p-3.5 rounded-2xl border border-zinc-800">
              {/* Pickup Point */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1 justify-end">
                  <span>نقطة الانطلاق (موقعك الحالي)</span>
                  <MapPin className="w-3.5 h-3.5 text-[#E50914]" />
                </label>
                <input
                  type="text"
                  required
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="حدد مكان الانطلاق"
                  className="w-full bg-[#1b1b26] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914]"
                />
              </div>

              {/* Destination Point */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1 justify-end">
                  <span>وجهة الوصول</span>
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                </label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="إلى أين تريد الذهاب؟"
                  className="w-full bg-[#1b1b26] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914]"
                />
              </div>

              {/* Quick suggestions pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] text-zinc-500 my-auto">وجهات شائعة:</span>
                {popularDestinations.slice(0, 3).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setDestination(item)}
                    className="text-[10px] bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white px-2 py-0.5 rounded-full transition-colors"
                  >
                    {item.split('،')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Ride Category Options */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 block">
                اختر فئة الرحلة:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {rideOptions.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  const optPrice = (opt.basePrice + 1.35).toFixed(2);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedOptionId(opt.id)}
                      className={`cursor-pointer p-2.5 rounded-xl border text-right transition-all ${
                        isSelected
                          ? 'bg-red-950/40 border-[#E50914] shadow-[0_0_15px_rgba(229,9,20,0.3)] ring-1 ring-[#E50914]'
                          : 'bg-[#13131c] border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#E50914] font-mono">{optPrice} د.أ</span>
                        <span className="text-xs font-bold text-white">{opt.nameAr}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[10px] text-zinc-400">
                        <span>{opt.eta}</span>
                        <span>{opt.capacity} ركاب</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 block">طريقة الدفع:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'cash'
                      ? 'bg-red-950/50 border-[#E50914] text-white'
                      : 'bg-[#13131c] border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Banknote className="w-3.5 h-3.5 text-emerald-400" />
                  <span>نقدي (كاش)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-red-950/50 border-[#E50914] text-white'
                      : 'bg-[#13131c] border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                  <span>بطاقة بنكية</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'wallet'
                      ? 'bg-red-950/50 border-[#E50914] text-white'
                      : 'bg-[#13131c] border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>محفظة نشاما</span>
                </button>
              </div>
            </div>

            {/* Total Fare & Confirmation */}
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 block">الأجرة الإجمالية المقدرة:</span>
                <span className="text-xl font-black text-[#E50914] font-mono">{estimatedPrice} د.أ</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#E50914] hover:bg-[#c90812] text-white px-7 py-3 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(229,9,20,0.5)] hover:shadow-[0_0_30px_rgba(229,9,20,0.8)] transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>تأكيد طلب الرحلة</span>
                    <Clock className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
