import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { Reservation } from '../reservations/reservation.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async getCategoryReservations(id: number): Promise<Reservation[]> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['reservations'],
    });
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    return category.reservations;
  }
}
