import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { AdminAuthGuard } from 'src/user/admin-auth.guard';
import { UserAuthGuard } from 'src/user/user-auth.guard';
import {
  CreateQuizQuestionsResponseDto,
  QuizQuestionsResponseDto,
} from '@internship-quiz/appTypes';

@Controller('quiz-question')
export class QuizQuestionController {
  constructor(private readonly quizQuestionService: QuizQuestionService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  async create(
    @Body() createQuizQuestionDto: CreateQuizQuestionDto,
  ): Promise<CreateQuizQuestionsResponseDto> {
    const newQuizQuestion = await this.quizQuestionService.create(
      createQuizQuestionDto,
    );

    return newQuizQuestion;
  }

  @Get(':id')
  @UseGuards(UserAuthGuard)
  async findOne(@Param('id') id: string): Promise<QuizQuestionsResponseDto[]> {
    const quizQuestion = await this.quizQuestionService.findQuizQuestions(id);

    return quizQuestion;
  }
}
