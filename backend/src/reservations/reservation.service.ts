import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { TableService } from '../tables/table.service';
import { CategoryService } from '../categorys/category.service';
import { MailService } from '../mail/mail.service';

const CATEGORY_LIMITS = {
  Wargames: 5,
  'Jeux de cartes': 4,
  'jeux de sociétés': 4,
  'Initiation Wargames': 1,
  'Cours de stratégie': 1,
};

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
    private readonly categoryService: CategoryService,
    private readonly mailService: MailService,
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

  private async getCombinedReservations(
    date: Date,
    hour_start: string,
    hour_end: string,
    categoryIds: number[],
  ): Promise<number> {
    return this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.date = :date', { date })
      .andWhere('reservation.hour_start = :hour_start', { hour_start })
      .andWhere('reservation.hour_end = :hour_end', { hour_end })
      .andWhere('reservation.categoryId IN (:...categoryIds)', { categoryIds })
      .getCount();
  }

  async createReservation(
    reservationData: Partial<Reservation>,
  ): Promise<{ reservation: Reservation; message?: string }> {
    const { date, hour_start, hour_end, categoryId } = reservationData;

    if (!date || !hour_start || !hour_end || !categoryId) {
      throw new BadRequestException(
        'Les données de réservation sont incomplètes.',
      );
    }

    let reservationDate = new Date(date);
    if (isNaN(reservationDate.getTime())) {
      throw new BadRequestException('Date invalide');
    }

    if (!this.isValidTime(reservationDate, hour_start, hour_end)) {
      throw new BadRequestException(
        "La réservation est en dehors des horaires d'ouverture",
      );
    }

    if (!this.isValidDuration(hour_start, hour_end)) {
      throw new BadRequestException("La durée de réservation n'est pas valide");
    }

    const category = await this.categoryService
      .findAll()
      .then((categories) => categories.find((cat) => cat.id === categoryId));

    if (!category) {
      throw new BadRequestException('Catégorie invalide');
    }

    if (['Jeux de cartes', 'jeux de sociétés'].includes(category.name)) {
      const combinedReservations = await this.getCombinedReservations(
        reservationDate,
        hour_start,
        hour_end,
        [2, 3],
      );
      if (combinedReservations >= 4) {
        throw new BadRequestException(
          'La limite combinée pour "Jeux de cartes" et "jeux de sociétés" est atteinte pour ce créneau horaire.',
        );
      }
    } else if (
      ['Initiation Wargames', 'Cours de stratégie'].includes(category.name)
    ) {
      const combinedReservations = await this.getCombinedReservations(
        reservationDate,
        hour_start,
        hour_end,
        [4, 5],
      );
      if (combinedReservations >= 1) {
        throw new BadRequestException(
          'La limite combinée pour "Initiation Wargames" et "Cours de stratégie" est atteinte pour ce créneau horaire.',
        );
      }
    } else {
      const existingReservations = await this.reservationRepository.find({
        where: { date: reservationDate, hour_start, hour_end, categoryId },
        relations: ['table'],
      });

      const limit = CATEGORY_LIMITS[category.name] || Infinity;
      if (existingReservations.length >= limit) {
        return {
          reservation: null,
          message:
            'Appeler directement en boutique au 04 58 00 56 68 afin de demander une réservation, nous allons tenter de vous trouver une place !',
        };
      }
    }

    const availableTables = await this.tableService.getAllTables();
    const reservedTableIds = (
      await this.reservationRepository.find({
        where: { date: reservationDate, hour_start, hour_end },
        relations: ['table'],
      })
    )
      .filter((res) => res.table !== null)
      .map((res) => res.table.id);

    const availableTablesFiltered = availableTables.filter(
      (table) => !reservedTableIds.includes(table.id),
    );

    if (availableTablesFiltered.length === 0) {
      throw new BadRequestException('Aucune table disponible pour ce créneau.');
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

    try {
      await this.mailService.sendUserConfirmation(reservation);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
    }

    return { reservation };
  }

  getAllReservations(): Promise<Reservation[]> {
    return this.reservationRepository.query(
      `SELECT r.*, c.name as category_name
       FROM reservation r
       LEFT JOIN category c ON r."categoryId" = c.id`,
    );
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
