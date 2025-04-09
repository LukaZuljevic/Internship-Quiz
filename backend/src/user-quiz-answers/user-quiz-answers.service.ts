import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserQuizAnswerDto } from './dto/create-user-quiz-answer.dto';
import { PrismaService } from 'src/prisma.service';
import {
  UserQuizBasicAttemptDto,
  UserQuizAttemptAnswersDto,
} from '@internship-quiz/appTypes';

@Injectable()
export class UserQuizAnswersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createUserQuizAnswerDto: CreateUserQuizAnswerDto,
  ): Promise<UserQuizAttemptAnswersDto> {
    const newUserQuizAnswers = await this.prisma.userQuizAnswers.create({
      data: createUserQuizAnswerDto,
      select: {
        quiz: {
          select: {
            id: true,
          },
        },
        user: {
          select: {
            id: true,
          },
        },
        answers: true,
        points: true,
      },
    });

    await this.prisma.user.update({
      where: { id: createUserQuizAnswerDto.userId },
      data: {
        totalPoints: {
          increment: createUserQuizAnswerDto.points,
        },
      },
    });

    return newUserQuizAnswers as UserQuizAttemptAnswersDto;
  }

  async findAllByUserId(userId: string): Promise<UserQuizBasicAttemptDto[]> {
    const answers = await this.prisma.userQuizAnswers.findMany({
      where: {
        userId,
      },
      select: {
        quiz: {
          select: {
            id: true,
          },
        },
        user: {
          select: {
            id: true,
          },
        },
        points: true,
      },
    });

    return answers;
  }

  async findByQuizAndUserId(
    quizId: string,
    userId: string,
  ): Promise<UserQuizAttemptAnswersDto> {
    const attempt = await this.prisma.userQuizAnswers.findFirst({
      where: {
        quizId,
        userId,
      },
      select: {
        quiz: {
          select: {
            id: true,
          },
        },
        user: {
          select: {
            id: true,
          },
        },
        answers: true,
        points: true,
      },
    });

    if (!attempt)
      throw new NotFoundException('Answers for that quiz not found');

    return attempt as UserQuizAttemptAnswersDto;
  }
}
