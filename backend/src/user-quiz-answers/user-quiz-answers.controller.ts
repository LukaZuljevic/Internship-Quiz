import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserQuizAnswersService } from './user-quiz-answers.service';
import { CreateUserQuizAnswerDto } from './dto/create-user-quiz-answer.dto';
import { UserAuthGuard } from 'src/user/user-auth.guard';

@Controller('user-quiz-answers')
export class UserQuizAnswersController {
  constructor(
    private readonly userQuizAnswersService: UserQuizAnswersService,
  ) {}

  @Post()
  async create(@Body() createUserQuizAnswerDto: CreateUserQuizAnswerDto) {
    const newUserQuizAnswers = await this.userQuizAnswersService.create(
      createUserQuizAnswerDto,
    );

    return newUserQuizAnswers;
  }

  @Get('answers/quiz/:quizId/user/:userId')
  @UseGuards(UserAuthGuard)
  async findByQuizAndUser(
    @Param('quizId') quizId: string,
    @Param('userId') userId: string,
  ) {
    return this.userQuizAnswersService.findByQuizAndUserId(quizId, userId);
  }

  @Get('answers/quiz/:quizId')
  @UseGuards(UserAuthGuard)
  async findAllByQuiz(@Param('quizId') quizId: string) {
    return this.userQuizAnswersService.findAllByQuizId(quizId);
  }
}
