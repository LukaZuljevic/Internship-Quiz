import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma.service';
import {
  CorrectAnswer,
  DeleteQuestionResponseDto,
  Options,
  QuestionType,
  QuestionResponseDto,
} from '@internship-quiz/appTypes';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createQuestionDto: CreateQuestionDto,
  ): Promise<QuestionResponseDto> {
    const newQuestion = await this.prisma.question.create({
      data: createQuestionDto,
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
    });

    return {
      id: newQuestion.id,
      title: newQuestion.title,
      type: newQuestion.type as QuestionType,
      category: newQuestion.category,
      options: newQuestion.options as Options | undefined,
      correctAnswer: newQuestion.correctAnswer as CorrectAnswer,
    };
  }

  async findAll(): Promise<QuestionResponseDto[]> {
    const allQuestions = await this.prisma.question.findMany({
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
      orderBy: {
        category: {
          title: 'asc',
        },
      },
    });

    return allQuestions.map((question) => ({
      id: question.id,
      title: question.title,
      type: question.type as QuestionType,
      category: question.category,
      options: question.options as Options | undefined,
      correctAnswer: question.correctAnswer as CorrectAnswer,
    }));
  }

  async findOne(id: string): Promise<QuestionResponseDto> {
    const question = await this.prisma.question.findUnique({
      where: { id },
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
    });

    if (!question) throw new NotFoundException('Question not found');

    return {
      id: question.id,
      title: question.title,
      type: question.type as QuestionType,
      category: question.category,
      options: question.options as Options | undefined,
      correctAnswer: question.correctAnswer as CorrectAnswer,
    };
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<QuestionResponseDto> {
    const questionToUpdate = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!questionToUpdate)
      throw new NotFoundException('That question does not exist');

    const updatedQuestion = await this.prisma.question.update({
      where: { id },
      data: updateQuestionDto,
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
    });

    return {
      id: updatedQuestion.id,
      title: updatedQuestion.title,
      type: updatedQuestion.type as QuestionType,
      category: updatedQuestion.category,
      options: updatedQuestion.options as Options | undefined,
      correctAnswer: updatedQuestion.correctAnswer as CorrectAnswer,
    };
  }

  async delete(id: string): Promise<DeleteQuestionResponseDto> {
    const questionToDelete = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!questionToDelete)
      throw new NotFoundException('That question does not exist');

    const deletedQuestion = await this.prisma.question.delete({
      where: { id },
      select: {
        id: true,
        title: true,
      },
    });

    return deletedQuestion;
  }
}
