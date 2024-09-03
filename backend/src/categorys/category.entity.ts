import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservation } from '../reservations/reservation.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @OneToMany(() => Reservation, (reservation) => reservation.category)
  reservations: Reservation[];
}
export const CATEGORIES: Category[] = [
  { id: 1, name: 'Wargames', reservations: [] },
  { id: 2, name: 'Jeux de cartes', reservations: [] },
  { id: 3, name: 'jeux de sociétés', reservations: [] },
  { id: 4, name: 'Initiation Wargames', reservations: [] },
  { id: 5, name: 'Cours de stratégie', reservations: [] },
];
