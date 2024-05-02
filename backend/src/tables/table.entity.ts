import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservation } from '../reservations/reservation.entity';

@Entity()
export class Table {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: number; 

    @OneToMany(() => Reservation, reservation => reservation.table)
    reservations: Reservation[];
}