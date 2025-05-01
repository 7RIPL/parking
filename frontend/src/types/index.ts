export interface ParkingSpot {
    id: number;
    location: string;
}

export interface Reservation {
    id: number;
    parkingSpot: ParkingSpot;
    reserved_date: string;
    reserved_time: string;
    status: 'booked' | 'cancelled';
    canCancel?: boolean;
}

export interface UserCredentials {
    email: string;
    password: string;
}