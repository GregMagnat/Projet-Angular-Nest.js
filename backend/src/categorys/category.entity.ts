import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservation } from '../reservations/reservation.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, nullable: false })
    name: string;

    @OneToMany(() => Reservation, reservation => reservation.category)
    reservations: Reservation[];
}
