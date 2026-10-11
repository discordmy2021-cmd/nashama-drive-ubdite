export interface Driver {
  id: string;
  code: string;
  name: string;
  rating: number;
  reviewsCount: number;
  phone: string;
  avatar: string;
  carModel: string;
  carYear: string;
  carColor: string;
  plateNumber: string;
  acceptanceRate: number;
  completedTrips: number;
  todayTrips: number;
  todayEarnings: number;
  totalBalance: number;
  isOnline: boolean;
}

export interface RideOption {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  basePrice: number;
  perKm: number;
  eta: string;
  capacity: number;
  icon: string;
}

export interface RideBookingState {
  pickup: string;
  destination: string;
  selectedOption: string;
  estimatedPrice: number;
  estimatedDistance: string;
  estimatedDuration: string;
  paymentMethod: 'cash' | 'card' | 'wallet';
  status: 'idle' | 'searching' | 'driver_assigned' | 'in_progress' | 'completed';
}

export interface WorkLogEntry {
  id: string;
  time: string;
  from: string;
  to: string;
  fare: number;
  rating: number;
  status: 'مكتملة' | 'ملغاة';
}
