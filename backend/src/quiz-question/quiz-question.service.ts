import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class QuizQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuizQuestionDto: CreateQuizQuestionDto) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: createQuizQuestionDto.quizId },
    });

    if (!quiz) throw new NotFoundException('Quiz not found');

    const newQuizQuestion = await this.prisma.quizQuestion.create({
      data: createQuizQuestionDto,
      include: {
        quiz: {
          select: {
            id: true,
            title: true,
          },
        },
        question: {
          select: {
            id: true,
            title: true,
            type: true,
          },
        },
      },
    });

    return newQuizQuestion;
  }

  async findQuizQuestions(id: string) {
    const quizQuestion = await this.prisma.quizQuestion.findMany({
      where: { quizId: id },
      include: {
        question: {
          select: {
            id: true,
            title: true,
            type: true,
            options: true,
            correctAnswer: true,
          },
        },
      },
    });

    if (!quizQuestion) throw new NotFoundException('Quiz questions not found');

    return quizQuestion;
  }

  async remove(id: string) {
    const quizQuestionExists = await this.prisma.quizQuestion.findUnique({
      where: { id },
    });

    if (!quizQuestionExists)
      throw new NotFoundException('Quiz question not found');

    const deletedQuizQuestion = await this.prisma.quizQuestion.delete({
      where: { id },
      include: {
        quiz: {
          select: {
            id: true,
            title: true,
          },
        },
        question: {
          select: {
            id: true,
            title: true,
            type: true,
          },
        },
      },
    });

    return deletedQuizQuestion;
  }
}
