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
export const CATEGORIES: Category[] = [
    { id: 1, name: 'Warhammer 40 000', reservations: [] },
    { id: 2, name: 'Age of Sigmar', reservations: [] },
    { id: 3, name: 'Magic', reservations: [] },
    { id: 4, name: 'Initiation 40k', reservations: [] },
    { id: 5, name: 'Initiation AoS', reservations: [] },
    { id: 6, name: 'Cours de stratégie', reservations: [] },
];
