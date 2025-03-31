import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AdminAuthGuard } from 'src/user/admin-auth.guard';
import { UserAuthGuard } from 'src/user/user-auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoryService.create(createCategoryDto);

    return newCategory;
  }

  @Get()
  @UseGuards(UserAuthGuard)
  async findAll() {
    const allCategories = await this.categoryService.findAll();

    return allCategories;
  }

  @Get(':id')
  @UseGuards(UserAuthGuard)
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);

    if (!category) throw new NotFoundException();

    return category;
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  async delete(@Param('id') id: string) {
    const deletedCategory = await this.categoryService.delete(id);

    return deletedCategory;
  }
}
