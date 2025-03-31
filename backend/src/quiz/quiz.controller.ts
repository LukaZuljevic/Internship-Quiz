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

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  async create(@Body() createQuizDto: CreateQuizDto) {
    const newQuiz = await this.quizService.create(createQuizDto);

    return newQuiz;
  }

  @Get()
  @UseGuards(UserAuthGuard)
  async findAll() {
    const allQuizzes = await this.quizService.findAll();

    return allQuizzes;
  }

  @Get(':id')
  @UseGuards(UserAuthGuard)
  async findOne(@Param('id') id: string) {
    const quiz = await this.quizService.findOne(id);

    return quiz;
  }

  @Get('search/:title')
  @UseGuards(UserAuthGuard)
  async findByTitle(@Param('title') title: string) {
    const quiz = await this.quizService.findByTitle(title);

    return quiz;
  }

  @Patch(':id')
  @UseGuards(AdminAuthGuard)
  async update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    const updatedQuiz = await this.quizService.update(id, updateQuizDto);

    return updatedQuiz;
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  async delete(@Param('id') id: string) {
    const deletedQuiz = await this.quizService.delete(id);

    return deletedQuiz;
  }
}
