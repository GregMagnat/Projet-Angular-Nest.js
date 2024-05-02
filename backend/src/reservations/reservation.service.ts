import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  getAllReservations(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  async getReservationById(id: number): Promise<Reservation | null> {
    return this.reservationRepository.findOne({ where: { id } });
  }

  createReservation(reservationData: Partial<Reservation>): Promise<Reservation> {
    return this.reservationRepository.save(reservationData);
  }

  async updateReservation(id: number, reservationData: Partial<Reservation>): Promise<Reservation | null> {
    await this.reservationRepository.update(id, reservationData);
    return this.reservationRepository.findOne({ where: { id } });
  }

  async deleteReservation(id: number): Promise<void> {
    await this.reservationRepository.delete(id);
  }
}
