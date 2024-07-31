import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id/reservations')
  getCategoryReservations(@Param('id') id: string) {
    return this.categoryService.getCategoryReservations(+id);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
}
