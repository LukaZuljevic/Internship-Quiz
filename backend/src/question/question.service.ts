import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const newQuestion = await this.prisma.question.create({
      data: createQuestionDto,
    });

    return newQuestion;
  }

  async findAll() {
    const allQuestions = await this.prisma.question.findMany({
      select: {
        title: true,
        type: true,
        category: {
          select: {
            title: true,
          },
        },
        options: true,
        correctAnswer: true,
        min: true,
        max: true,
        step: true,
      },
      orderBy: {
        category: {
          title: 'asc',
        },
      },
    });

    return allQuestions;
  }

  async findOne(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      select: {
        title: true,
        type: true,
        category: {
          select: {
            title: true,
            imageUrl: true,
          },
        },
        options: true,
        correctAnswer: true,
        min: true,
        max: true,
        step: true,
      },
    });

    if (!question) throw new NotFoundException('Question not found');

    return question;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const questionToUpdate = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!questionToUpdate)
      throw new NotFoundException('That question does not exist');

    const updatedQuestion = await this.prisma.question.update({
      where: { id },
      data: updateQuestionDto,
    });

    return updatedQuestion;
  }

  async delete(id: string) {
    const questionToDelete = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!questionToDelete)
      throw new NotFoundException('That question does not exist');

    const deletedQuestion = await this.prisma.question.delete({
      where: { id },
    });

    return deletedQuestion;
  }
}
