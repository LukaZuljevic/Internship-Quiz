import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { PrismaService } from 'src/prisma.service';
import {
  CorrectAnswer,
  CreateQuizQuestionsResponseDto,
  Options,
  QuestionType,
  QuizQuestionsResponseDto,
} from '../appGlobalTypes';

@Injectable()
export class QuizQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createQuizQuestionDto: CreateQuizQuestionDto,
  ): Promise<CreateQuizQuestionsResponseDto> {
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
          },
        },
        question: {
          select: {
            id: true,
          },
        },
      },
    });

    return newQuizQuestion;
  }

  async findQuizQuestions(id: string): Promise<QuizQuestionsResponseDto[]> {
    const quizQuestions = await this.prisma.quizQuestion.findMany({
      where: { quizId: id },
      include: {
        question: {
          select: {
            id: true,
            title: true,
            type: true,
            category: {
              select: {
                title: true,
              },
            },
            options: true,
            correctAnswer: true,
          },
        },
      },
    });

    if (!quizQuestions) throw new NotFoundException('Quiz questions not found');

    return quizQuestions.map((item) => {
      const result: QuizQuestionsResponseDto = {
        id: item.id,
        quizId: item.quizId,
        questionId: item.questionId,
        question: {
          id: item.question.id,
          title: item.question.title,
          type: item.question.type as QuestionType,
          category: {
            title: item.question.category.title,
          },
          options: item.question.options as Options | undefined,
          correctAnswer: item.question.correctAnswer as CorrectAnswer,
        },
      };
      return result;
    });
  }
}
