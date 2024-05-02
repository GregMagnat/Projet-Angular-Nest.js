// category.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: number): Promise<Category | null> {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  async createCategory(@Body() categoryData: Partial<Category>): Promise<Category> {
    return this.categoryService.createCategory(categoryData);
  }

  @Put(':id')
  async updateCategory(@Param('id') id: number, @Body() categoryData: Partial<Category>): Promise<Category | null> {
    return this.categoryService.updateCategory(id, categoryData);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }
}
