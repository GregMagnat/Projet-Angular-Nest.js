// category-initializer.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CATEGORIES } from './category.entity'; 

@Injectable()
export class CategoryInitializerService implements OnModuleInit {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async onModuleInit() {
    await this.initializeCategories();
  }

  async initializeCategories() {
    const categories = await this.categoryRepository.find();
    if (categories.length === 0) {
      await this.categoryRepository.save(CATEGORIES);
    }
  }
}
