/** بيانات تجريبية مطابقة للصورة. استبدلها لاحقاً ببيانات السيرفر. */

export const CURRENCY = 'د.أ';

export interface Trip {
  id: string;
  time: string;
  from: string;
  to: string;
  fare: number;
  rating: number;
  status: 'مكتملة' | 'ملغاة';
}

export const driver = {
  name: 'محمود علي',
  rating: 4.8,
  ratingCount: 124,
  trips: 1400,
  captainId: 'ND-1045',
  phone: '079-5847923',
  car: 'هيونداي سوناتا هايبرد',
  carYear: 2023,
  plate: '40 - 0843',
  balance: 350.0,
  todayTrips: 12,
  todayEarnings: 35.0,
  acceptance: 98.5,
  completed: 1420,
  fare: 3.5,
};

export const trips: Trip[] = [
  { id: 't1', time: '16:45', from: 'دوار الداخلية', to: 'بوليفارد العبدلي', fare: 3.5, rating: 5, status: 'مكتملة' },
  { id: 't2', time: '17:15', from: 'الدوار السابع - شارع مرج المدينة', to: 'سابق مول', fare: 4.2, rating: 5, status: 'مكتملة' },
  { id: 't3', time: '15:30', from: 'الشميساني', to: 'مجمع النفايات - مطار الملك', fare: 15.0, rating: 5, status: 'مكتملة' },
];

export const weeklyStats = [
  { label: 'إجمالي الرحلات', value: '1420+', hint: 'سجل رحلات مكتمل' },
  { label: 'نسبة القبول', value: '98.5%', hint: 'أعلى من المتوسط' },
];

export const route = {
  from: 'عمان - دوار الداخلية',
  to: 'بوليفارد العبدلي',
  distanceKm: 2.7,
  etaMin: 6,
};
