import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoryService.create(createCategoryDto);

    return newCategory;
  }

  @Get()
  async findAll() {
    const allCategories = await this.categoryService.findAll();

    return allCategories;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);

    if (!category) throw new NotFoundException();

    return category;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedCategory = await this.categoryService.delete(id);

    return deletedCategory;
  }
}
