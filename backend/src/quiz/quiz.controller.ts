import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { AdminAuthGuard } from 'src/user/admin-auth.guard';
import { UserAuthGuard } from 'src/user/user-auth.guard';
import {
  CreateQuizResponseDto,
  QuizResponseDto,
} from '@internship-quiz/appTypes';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  async create(
    @Body() createQuizDto: CreateQuizDto,
  ): Promise<CreateQuizResponseDto> {
    const newQuiz = await this.quizService.create(createQuizDto);

    return newQuiz;
  }

  @Get()
  @UseGuards(UserAuthGuard)
  async findAll(): Promise<QuizResponseDto[]> {
    const allQuizzes = await this.quizService.findAll();

    return allQuizzes;
  }

  @Get('search/:title')
  @UseGuards(UserAuthGuard)
  async findByTitle(@Param('title') title: string): Promise<QuizResponseDto[]> {
    const quizzesBySearch = await this.quizService.findByTitle(title);

    return quizzesBySearch;
  }

  @Patch(':id')
  @UseGuards(AdminAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ): Promise<QuizResponseDto> {
    const updatedQuiz = await this.quizService.update(id, updateQuizDto);

    return updatedQuiz;
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  async delete(@Param('id') id: string): Promise<QuizResponseDto> {
    const deletedQuiz = await this.quizService.delete(id);

    return deletedQuiz;
  }
}
