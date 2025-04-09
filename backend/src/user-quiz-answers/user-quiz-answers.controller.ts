import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserQuizAnswersService } from './user-quiz-answers.service';
import { CreateUserQuizAnswerDto } from './dto/create-user-quiz-answer.dto';
import { UserAuthGuard } from 'src/user/user-auth.guard';
import { UserQuizAttemptDto } from '@internship-quiz/appTypes';

@Controller('user-quiz-answers')
export class UserQuizAnswersController {
  constructor(
    private readonly userQuizAnswersService: UserQuizAnswersService,
  ) {}

  @Post()
  async create(
    @Body() createUserQuizAnswerDto: CreateUserQuizAnswerDto,
  ): Promise<UserQuizAttemptDto> {
    const newUserQuizAnswers = await this.userQuizAnswersService.create(
      createUserQuizAnswerDto,
    );

    return newUserQuizAnswers;
  }

  @Get('/user/:userId')
  @UseGuards(UserAuthGuard)
  async findAllByUserId(
    @Param('userId') userId: string,
  ): Promise<UserQuizAttemptDto[]> {
    return this.userQuizAnswersService.findAllByUserId(userId);
  }

  //dodaj response dto kad budes radia
  @Get('/quiz/:quizId/user/:userId')
  @UseGuards(UserAuthGuard)
  async findByQuizAndUser(
    @Param('quizId') quizId: string,
    @Param('userId') userId: string,
  ) {
    return this.userQuizAnswersService.findByQuizAndUserId(quizId, userId);
  }
}
