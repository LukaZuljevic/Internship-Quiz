import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { AdminAuthGuard } from 'src/user/admin-auth.guard';
import { UserAuthGuard } from 'src/user/user-auth.guard';

@Controller('quiz-question')
export class QuizQuestionController {
  constructor(private readonly quizQuestionService: QuizQuestionService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  async create(@Body() createQuizQuestionDto: CreateQuizQuestionDto) {
    const newQuizQuestion = await this.quizQuestionService.create(
      createQuizQuestionDto,
    );

    return newQuizQuestion;
  }

  @Get(':id')
  @UseGuards(UserAuthGuard)
  async findOne(@Param('id') id: string) {
    const quizQuestion = await this.quizQuestionService.findOne(id);

    return quizQuestion;
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  async remove(@Param('id') id: string) {
    const deletedQuizQuestion = await this.quizQuestionService.remove(id);

    return deletedQuizQuestion;
  }
}
