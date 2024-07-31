import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
// import { TableService } from 'src/tables/table.service';
// import { Table } from 'src/tables/table.entity';

@Injectable()
export class ReservationService {
  // private readonly allowedHours = {
  //   Monday: { start: '10:00', end: '19:00' },
  //   Tuesday: { start: '10:00', end: '01:00' },
  //   Wenesday: { start: '10:00', end: '19:00' },
  //   Thursday: { start: '10:00', end: '19:00' },
  //   Friday: { start: '10:00', end: '01:00' },
  //   Saturday: { start: '10:00', end: '20:00' },
  //   Sunday: { start: '10:00', end: '20:00' },
  // };

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    // private readonly tableService: TableService
  ) {}

  // private isValidTime(date: Date, startTime: string, endTime: string): boolean {
  //   const day = date.toLocaleDateString('en-US', { weekday: 'long' });
  //   const { start, end } = this.allowedHours[day] || {};
  //   const reservationStart = new Date(`${date.toDateString()} ${startTime}`);
  //   const reservationEnd = new Date(`${date.toDateString()} ${endTime}`);
  //   const validStart = new Date(`${date.toDateString()} ${start}`);
  //   const validEnd = new Date(`${date.toDateString()} ${end}`);

  //   return reservationStart >= validStart && reservationEnd <= validEnd;
  // }

  // private isValidDuration(startTime: string, endTime: string): boolean {
  //   const start = new Date(`1970-01-01T${startTime}:00`);
  //   const end = new Date(`1970-01-01T${endTime}:00`);
  //   const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

  //   return diffHours === 2;
  // }

  // async createReservation(
  //   reservationData: Partial<Reservation>,
  // ): Promise<Reservation> {
  //   const { date, hour_start, hour_end } = reservationData;

  //   if (!this.isValidTime(date as Date, hour_start, hour_end)) {
  //     throw new Error('La réservation est en dehors des horaires autorisés.');
  //   }

  //   if (!this.isValidDuration(hour_start, hour_end)) {
  //     throw new Error(
  //       'Les réservations doivent être faites par créneaux de 2 heures.',
  //     );
  //   }

  //   const existingReservations = await this.reservationRepository.find({
  //     where: {
  //       date,
  //       hour_start,
  //       hour_end,
  //     },
  //   });

  //   if (existingReservations.length >= 8) {
  //     throw new Error('Toutes les tables sont déjà réservées pour ce créneau.');
  //   }

  //   const availableTables = await this.tableService.getAllTables();
  //   const reservedTableIds = existingReservations.map((res) => res.table.id);
  //   const availableTablesFiltered = availableTables.filter(
  //     (table) => !reservedTableIds.includes(table.id),
  //   );

  //   if (availableTablesFiltered.length === 0) {
  //     throw new Error('Aucune table disponible pour ce créneau.');
  //   }

  //   const randomTable =
  //     availableTablesFiltered[
  //       Math.floor(Math.random() * availableTablesFiltered.length)
  //     ];

  //   const reservation = this.reservationRepository.create({
  //     ...reservationData,
  //     table: randomTable,
  //   });

  //   return await this.reservationRepository.save(reservation);
  // }
  getAllReservations(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  async getReservationById(id: number): Promise<Reservation | null> {
    return this.reservationRepository.findOne({ where: { id } });
  }

  createReservation(
    reservationData: Partial<Reservation>,
  ): Promise<Reservation> {
    return this.reservationRepository.save(reservationData);
  }

  async updateReservation(
    id: number,
    reservationData: Partial<Reservation>,
  ): Promise<Reservation | null> {
    await this.reservationRepository.update(id, reservationData);
    return this.reservationRepository.findOne({ where: { id } });
  }

  async deleteReservation(id: number): Promise<void> {
    await this.reservationRepository.delete(id);
  }
}
