import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma.service';
import { CategoryResponseDto } from '@internship-quiz/appTypes';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const sameCategory = await this.prisma.category.findUnique({
      where: {
        title: createCategoryDto.title,
      },
    });

    if (sameCategory)
      throw new BadRequestException('That category already exists');

    const newCategory = await this.prisma.category.create({
      data: createCategoryDto,
    });

    return newCategory;
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    return await this.prisma.category.findMany({
      select: {
        id: true,
        title: true,
        imageUrl: true,
      },
    });
  }

  async findOne(id: string): Promise<CategoryResponseDto> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        imageUrl: true,
      },
    });

    if (!category)
      throw new BadRequestException('That category does not exist');

    return category;
  }

  async delete(id: string): Promise<CategoryResponseDto> {
    const categoryToDelete = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!categoryToDelete)
      throw new BadRequestException('That category does not exist');

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
