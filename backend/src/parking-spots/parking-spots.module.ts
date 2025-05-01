import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpot } from '../entities/parking-spot.entity';
import { ParkingSpotsController } from './parking-spots.controller';
import { ParkingSpotsService } from './parking-spots.service';
import { Reservation } from '../entities/reservation.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ParkingSpot, Reservation])],
    controllers: [ParkingSpotsController],
    providers: [ParkingSpotsService],
})
export class ParkingSpotsModule {}