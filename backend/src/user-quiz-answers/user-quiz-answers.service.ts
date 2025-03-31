import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserQuizAnswerDto } from './dto/create-user-quiz-answer.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserQuizAnswersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserQuizAnswerDto: CreateUserQuizAnswerDto) {
    const newUserQuizAnswers = await this.prisma.userQuizAnswers.create({
      data: createUserQuizAnswerDto,
    });

    return newUserQuizAnswers;
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

    if (!answer)
      throw new NotFoundException('Answers for that quiz by not found');

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
