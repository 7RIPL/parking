import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { ParkingSpot } from '../entities/parking-spot.entity';
import { User } from '../entities/user.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,
        @InjectRepository(ParkingSpot)
        private parkingSpotRepository: Repository<ParkingSpot>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(userId: number, createReservationDto: CreateReservationDto): Promise<Reservation> {
        const { parkingSpotId, reserved_date, reserved_time } = createReservationDto;

        const parkingSpot = await this.parkingSpotRepository.findOne({ where: { id: parkingSpotId } });
        if (!parkingSpot) {
            throw new BadRequestException('Парковочное место не найдено');
        }

        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new BadRequestException('Пользователь не найден');
        }

        const existingReservation = await this.reservationRepository.findOne({
            where: {
                parkingSpot: { id: parkingSpotId },
                reserved_date: new Date(reserved_date),
                reserved_time,
                status: 'booked',
            },
        });

        if (existingReservation) {
            throw new BadRequestException('Этот временной слот уже занят');
        }

        const reservationDate = new Date(`${reserved_date}T00:00:00.000Z`);

        const reservation = this.reservationRepository.create({
            user,
            parkingSpot,
            reserved_date: reservationDate,
            reserved_time,
            status: 'booked',
        });

        return this.reservationRepository.save(reservation);
    }

    async findByUser(userId: number): Promise<(Reservation & { canCancel: boolean })[]> {
        const reservations = await this.reservationRepository.find({
            where: { user: { id: userId } },
            relations: ['parkingSpot'],
        });

        const now = new Date();

        return reservations.map(reservation => {
            const [hourStr, minuteStr = '00'] = reservation.reserved_time.split(':');
            const hour = parseInt(hourStr.padStart(2, '0'), 10);
            const minute = parseInt(minuteStr.padStart(2, '0'), 10);

            const date = new Date(reservation.reserved_date);
            date.setUTCHours(hour, minute, 0, 0); // Устанавливаем точное UTC-время

            const canCancel = reservation.status === 'booked' && date > now;

            return { ...reservation, canCancel };
        });
    }

    async cancel(reservationId: number): Promise<Reservation> {
        const reservation = await this.reservationRepository.findOne({ where: { id: reservationId } });
        if (!reservation) {
            throw new BadRequestException('Бронирование не найдено');
        }

        if (reservation.status === 'cancelled') {
            throw new BadRequestException('Бронирование уже отменено');
        }

        const now = new Date();
        const [hourStr, minuteStr = '00'] = reservation.reserved_time.split(':');
        const hour = parseInt(hourStr.padStart(2, '0'), 10);
        const minute = parseInt(minuteStr.padStart(2, '0'), 10);

        const reservationDate = new Date(reservation.reserved_date);
        reservationDate.setUTCHours(hour, minute, 0, 0);

        if (reservationDate < now) {
            throw new BadRequestException('Нельзя отменить прошедшее бронирование');
        }

        reservation.status = 'cancelled';
        return this.reservationRepository.save(reservation);
    }
}
