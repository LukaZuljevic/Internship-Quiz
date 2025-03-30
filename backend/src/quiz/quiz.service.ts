import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto) {
    const newQuiz = await this.prisma.quiz.create({
      data: createQuizDto,
    });

    return newQuiz;
  }

  async findAll() {
    const allQuizzes = await this.prisma.quiz.findMany({
      select: {
        title: true,
        category: {
          select: {
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

  async findOne(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      select: {
        title: true,
        category: {
          select: {
            title: true,
            imageUrl: true,
          },
        },
        quizQuestions: {
          select: {
            question: {
              select: {
                title: true,
                type: true,
                options: true,
                correctAnswer: true,
              },
            },
          },
        },
      },
    });

    if (!quiz) throw new NotFoundException('Quiz not found');

    return quiz;
  }

  async findByTitle(title: string) {
    const quizesWithTitle = await this.prisma.quiz.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
      select: {
        title: true,
        category: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!quizesWithTitle.length)
      throw new NotFoundException('Quiz with that title not found');

    return quizesWithTitle;
  }

  async update(id: string, updateQuizDto: UpdateQuizDto) {
    const quizToUpdate = await this.prisma.quiz.findUnique({
      where: { id },
    });

    if (!quizToUpdate) throw new NotFoundException('That quiz does not exist');

    const updatedQuiz = await this.prisma.quiz.update({
      where: { id },
      data: updateQuizDto,
    });

    return updatedQuiz;
  }

  async delete(id: string) {
    const quizToDelete = await this.prisma.quiz.findUnique({
      where: { id },
    });

    if (!quizToDelete) throw new NotFoundException('That quiz does not exist');

    const deletedQuiz = await this.prisma.quiz.delete({
      where: { id },
    });

    return deletedQuiz;
  }
}
