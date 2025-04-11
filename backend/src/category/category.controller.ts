import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AdminAuthGuard } from 'src/user/admin-auth.guard';
import { UserAuthGuard } from 'src/user/user-auth.guard';
import { CategoryResponseDto } from '../appGlobalTypes';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const newCategory = await this.categoryService.create(createCategoryDto);

    return newCategory;
  }

  @Get()
  @UseGuards(UserAuthGuard)
  async findAll(): Promise<CategoryResponseDto[]> {
    const allCategories = await this.categoryService.findAll();

    return allCategories;
  }

  @Get(':id')
  @UseGuards(UserAuthGuard)
  async findOne(@Param('id') id: string): Promise<CategoryResponseDto> {
    const category = await this.categoryService.findOne(id);

    return category;
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  async delete(@Param('id') id: string): Promise<CategoryResponseDto> {
    const deletedCategory = await this.categoryService.delete(id);

    return deletedCategory;
  }
}
