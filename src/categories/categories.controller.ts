import { Body, Controller, Get, Post } from '@nestjs/common';
import { Categories } from './categories.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';


@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Get()
  getCategories(): Promise<Categories[]> {
    return this.categoriesService.getCategories();
  }

  
  @Post()
  createCategory(@Body() categoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(categoryDto);
  }
}
