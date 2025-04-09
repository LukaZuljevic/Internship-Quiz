import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserQuizAnswerDto } from './dto/create-user-quiz-answer.dto';
import { PrismaService } from 'src/prisma.service';
import { UserQuizAttemptDto } from '@internship-quiz/appTypes';

@Injectable()
export class UserQuizAnswersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createUserQuizAnswerDto: CreateUserQuizAnswerDto,
  ): Promise<UserQuizAttemptDto> {
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

    return newUserQuizAnswers;
  }

  async findAllByUserId(userId: string): Promise<UserQuizAttemptDto[]> {
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
}
