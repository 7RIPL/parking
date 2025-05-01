import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parking_spots')
export class ParkingSpot {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    location: string;
}