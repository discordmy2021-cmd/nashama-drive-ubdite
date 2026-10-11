import { Driver, RideOption, WorkLogEntry } from '../types';

export const mockDriver: Driver = {
  id: 'ND-1845',
  code: 'ND-1845',
  name: 'محمود علي',
  rating: 4.8,
  reviewsCount: 124,
  phone: '079-5847923',
  avatar: '/images/driver-avatar.jpg',
  carModel: 'هيونداي سوناتا هايبرد',
  carYear: '2023',
  carColor: 'أسود ملوكي',
  plateNumber: '8843 - 48',
  acceptanceRate: 98.5,
  completedTrips: 1420,
  todayTrips: 13,
  todayEarnings: 35.00,
  totalBalance: 350.00,
  isOnline: true
};

export const rideOptions: RideOption[] = [
  {
    id: 'eco',
    name: 'Nashama Eco',
    nameAr: 'نشاما توفير',
    description: 'أفضل سعر للمشاوير اليومية السريعة',
    basePrice: 1.5,
    perKm: 0.25,
    eta: '3 دقائق',
    capacity: 4,
    icon: 'car'
  },
  {
    id: 'comfort',
    name: 'Nashama Comfort',
    nameAr: 'نشاما كمفورت',
    description: 'سيارات حديثة ومريحة مع أفضل السائقين',
    basePrice: 2.2,
    perKm: 0.35,
    eta: '5 دقائق',
    capacity: 4,
    icon: 'car-front'
  },
  {
    id: 'vip',
    name: 'Nashama VIP',
    nameAr: 'نشاما VIP الفاخرة',
    description: 'فخامة ورفاهية قصوى لرجال الأعمال والمناسبات',
    basePrice: 4.0,
    perKm: 0.60,
    eta: '8 دقائق',
    capacity: 4,
    icon: 'sparkles'
  },
  {
    id: 'family',
    name: 'Nashama Family',
    nameAr: 'نشاما عائلي (7 ركاب)',
    description: 'سيارات عائلية واسعة تتسع لجميع أفراد الأسرة',
    basePrice: 3.5,
    perKm: 0.45,
    eta: '7 دقائق',
    capacity: 6,
    icon: 'users'
  }
];

export const mockRecentTrips: WorkLogEntry[] = [
  {
    id: 'TR-9821',
    time: '18:45',
    from: 'دوار الداخلية، عمان',
    to: 'بوليفارد العبدلي',
    fare: 3.50,
    rating: 5,
    status: 'مكتملة'
  },
  {
    id: 'TR-9820',
    time: '17:15',
    from: 'الدوار السابع',
    to: 'سيتي مول، شارع المدينة',
    fare: 4.20,
    rating: 5,
    status: 'مكتملة'
  },
  {
    id: 'TR-9819',
    time: '15:30',
    from: 'الشميساني، مجمع النقابات',
    to: 'مطار الملكة علياء الدولي',
    fare: 15.00,
    rating: 4.8,
    status: 'مكتملة'
  },
  {
    id: 'TR-9818',
    time: '13:10',
    from: 'شارع الرينبو، جبل عمان',
    to: 'مكة مول',
    fare: 3.80,
    rating: 5,
    status: 'مكتملة'
  }
];

export const popularDestinations = [
  'بوليفارد العبدلي، عمان',
  'مطار الملكة علياء الدولي',
  'سيتي مول، شارع المدينة الطبية',
  'الدوار السابع، زهران',
  'شارع الرينبو، جبل عمان',
  'دوار الداخلية، العبدلي',
  'مكة مول، شارع مكة',
  'مستشفى الجامعة الأردنية'
];
