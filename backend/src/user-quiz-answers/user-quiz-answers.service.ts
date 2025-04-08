import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserQuizAnswerDto } from './dto/create-user-quiz-answer.dto';
import { PrismaService } from 'src/prisma.service';
import { CorrectAnswer, CreateUserQuizAttemptResponseDto } from '@internship-quiz/appTypes';

@Injectable()
export class UserQuizAnswersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createUserQuizAnswerDto: CreateUserQuizAnswerDto,
  ): Promise<CreateUserQuizAttemptResponseDto> {
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

    return {
      ...newUserQuizAnswers,
      answers: newUserQuizAnswers.answers as CorrectAnswer,
    };
  }

  async findByQuizAndUserId(quizId: string, userId: string) {
    const answer = await this.prisma.userQuizAnswers.findFirst({
      where: {
        quizId,
        userId,
      },
      include: {
        quiz: {
          select: {
            title: true,
            quizQuestions: {
              include: {
                question: true,
              },
            },
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!answer) throw new NotFoundException('Answers for that quiz not found');

    return answer;
  }

  async findAllByQuizId(quizId: string) {
    const answers = await this.prisma.userQuizAnswers.findMany({
      where: {
        quizId,
      },
      include: {
        quiz: {
          select: {
            title: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            totalPoints: true,
          },
        },
      },
      orderBy: {
        points: 'desc',
      },
    });

    return answers;
  }
}
