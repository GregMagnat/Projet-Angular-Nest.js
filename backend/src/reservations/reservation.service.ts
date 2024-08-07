import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { TableService } from '../tables/table.service';

@Injectable()
export class ReservationService {
  private readonly allowedHours = {
    Monday: { start: '10:00', end: '19:00' },
    Tuesday: { start: '10:00', end: '23:59' },
    Wednesday: { start: '10:00', end: '19:00' },
    Thursday: { start: '10:00', end: '19:00' },
    Friday: { start: '10:00', end: '23:59' },
    Saturday: { start: '10:00', end: '20:00' },
    Sunday: { start: '13:00', end: '20:00' },
  };

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly tableService: TableService,
  ) {}

  private isValidTime(date: Date, startTime: string, endTime: string): boolean {
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const { start, end } = this.allowedHours[day] || {};
    if (!start || !end) {
      console.log(`No valid hours found for ${day}`);
      return false;
    }

    const reservationStart = new Date(
      date.toISOString().split('T')[0] + 'T' + startTime + 'Z',
    );
    const reservationEnd = new Date(
      date.toISOString().split('T')[0] + 'T' + endTime + 'Z',
    );
    const validStart = new Date(
      date.toISOString().split('T')[0] + 'T' + start + 'Z',
    );
    const validEnd = new Date(
      date.toISOString().split('T')[0] + 'T' + end + 'Z',
    );

    console.log(`Reservation Start: ${reservationStart.toISOString()}`);
    console.log(`Reservation End: ${reservationEnd.toISOString()}`);
    console.log(`Valid Start: ${validStart.toISOString()}`);
    console.log(`Valid End: ${validEnd.toISOString()}`);

    return reservationStart >= validStart && reservationEnd <= validEnd;
  }

  private isValidDuration(startTime: string, endTime: string): boolean {
    const start = new Date(`1970-01-01T${startTime}:00Z`);
    const end = new Date(`1970-01-01T${endTime}:00Z`);
    const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

    return diffHours > 0;
  }

  async createReservation(
    reservationData: Partial<Reservation>,
  ): Promise<{ reservation: Reservation; message?: string }> {
    const { date, hour_start, hour_end } = reservationData;

    if (!date || !hour_start || !hour_end) {
      throw new Error('Les données de réservation sont incomplètes.');
    }

    let reservationDate = new Date(date);
    if (isNaN(reservationDate.getTime())) {
      throw new Error('Date invalide');
    }

    console.log(`Received date: ${reservationDate.toISOString()}`);
    console.log(`Received startTime: ${hour_start}, endTime: ${hour_end}`);

    if (!this.isValidTime(reservationDate, hour_start, hour_end)) {
      throw new Error("La réservation est en dehors des horaires d'ouverture");
    }

    if (!this.isValidDuration(hour_start, hour_end)) {
      throw new Error("La durée de réservation n'est pas valide");
    }

    const existingReservations = await this.reservationRepository.find({
      where: { date: reservationDate, hour_start, hour_end },
      relations: ['table'],
    });

    const reservedTableIds = existingReservations
      .filter((res) => res.table !== null)
      .map((res) => res.table.id);

    if (existingReservations.length >= 8) {
      const reservation = this.reservationRepository.create(reservationData);
      await this.reservationRepository.save(reservation);
      return {
        reservation,
        message:
          "L'équipe de Wargame spirit reviens vers vous pour confirmer votre créneau horaire",
      };
    }

    const availableTables = await this.tableService.getAllTables();
    const availableTablesFiltered = availableTables.filter(
      (table) => !reservedTableIds.includes(table.id),
    );

    if (availableTablesFiltered.length === 0) {
      throw new Error('Aucune table disponible pour ce créneau.');
    }

    const randomTable =
      availableTablesFiltered[
        Math.floor(Math.random() * availableTablesFiltered.length)
      ];

    const reservation = this.reservationRepository.create({
      ...reservationData,
      table: randomTable,
    });

    await this.reservationRepository.save(reservation);
    return { reservation };
  }

  getAllReservations(): Promise<Reservation[]> {
    return this.reservationRepository.query(`
      SELECT r.*, c.name as category_name
      FROM reservation r
      LEFT JOIN category c ON r."categoryId" = c.id
    `);
  }

  async getReservationById(id: number): Promise<Reservation | null> {
    return this.reservationRepository.findOne({ where: { id } });
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
