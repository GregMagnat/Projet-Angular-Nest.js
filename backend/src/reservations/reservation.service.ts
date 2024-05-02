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


  findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  findOne(id: number): Promise<Reservation | null> {
    return this.reservationRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.reservationRepository.delete(id);
  }
}