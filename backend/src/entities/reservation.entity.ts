import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { ParkingSpot } from './parking-spot.entity';

@Entity('reservations')
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => ParkingSpot)
    parkingSpot: ParkingSpot;

    @Column()
    reserved_date: Date;

    @Column()
    reserved_time: string;

    @Column()
    status: 'booked' | 'cancelled';
}