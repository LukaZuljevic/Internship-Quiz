import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
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

  async findAll() {
    return await this.prisma.category.findMany({
      select: {
        id: true,
        title: true,
        imageUrl: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.category.findUnique({
      where: { id },
      select: {
        title: true,
        imageUrl: true,
      },
    });
  }

  async delete(id: string) {
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
