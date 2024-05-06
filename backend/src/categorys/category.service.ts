import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { CATEGORIES } from './category.entity'; 

@Injectable()
export class CategoryService {
  getAllCategories(): Category[] {
    return CATEGORIES;
  }
}
