import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../entities/reservation.entity';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { ParkingSpot } from '../entities/parking-spot.entity';
import { User } from '../entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Reservation, ParkingSpot, User])],
    controllers: [ReservationsController],
    providers: [ReservationsService],
})
export class ReservationsModule {}