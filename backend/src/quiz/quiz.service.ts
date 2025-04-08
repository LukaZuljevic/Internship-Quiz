import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma.service';
import {
  CreateQuizResponseDto,
  DeleteQuizResponseDto,
  QuizResponseDto,
} from '@internship-quiz/app-types';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto): Promise<CreateQuizResponseDto> {
    const newQuiz = await this.prisma.quiz.create({
      data: createQuizDto,
      select: {
        id: true,
        title: true,
      },
    });

    return newQuiz;
  }

  async findAll(): Promise<QuizResponseDto[]> {
    const allQuizzes = await this.prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        category: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return allQuizzes;
  }

  async findByTitle(title: string): Promise<QuizResponseDto[]> {
    const quizesWithTitle = await this.prisma.quiz.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        title: true,
        category: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
          },
        },
      },
    });

    return quizesWithTitle;
  }

  async update(
    id: string,
    updateQuizDto: UpdateQuizDto,
  ): Promise<QuizResponseDto> {
    const quizToUpdate = await this.prisma.quiz.findUnique({
      where: { id },
    });

    if (!quizToUpdate) throw new NotFoundException('That quiz does not exist');

    const updatedQuiz = await this.prisma.quiz.update({
      where: { id },
      data: updateQuizDto,
      select: {
        id: true,
        title: true,
        category: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
          },
        },
      },
    });

    return updatedQuiz;
  }

  async delete(id: string): Promise<DeleteQuizResponseDto> {
    const quizToDelete = await this.prisma.quiz.findUnique({
      where: { id },
    });

    if (!quizToDelete) throw new NotFoundException('That quiz does not exist');

    const deletedQuiz = await this.prisma.quiz.delete({
      where: { id },
      select: {
        id: true,
        title: true,
      },
    });

    return deletedQuiz;
  }
}
