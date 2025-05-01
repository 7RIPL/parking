import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingSpot } from '../entities/parking-spot.entity';
import { Reservation } from '../entities/reservation.entity';

@Injectable()
export class ParkingSpotsService {
    constructor(
        @InjectRepository(ParkingSpot)
        private parkingSpotRepository: Repository<ParkingSpot>,
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,
    ) {}

    async findAll(): Promise<ParkingSpot[]> {
        return this.parkingSpotRepository.find();
    }

    async getAvailableTimes(parkingSpotId: number, date: string): Promise<string[]> {
        const reservations = await this.reservationRepository.find({
            where: { parkingSpot: { id: parkingSpotId }, reserved_date: new Date(date), status: 'booked' },
        });

        const allTimeSlots = Array.from({ length: 24 }, (_, i) => `${i}:00`);
        const bookedTimes = reservations.map(res => res.reserved_time);

        return allTimeSlots.filter(time => !bookedTimes.includes(time));
    }
}