import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async create(@Body() createQuizDto: CreateQuizDto) {
    const newQuiz = await this.quizService.create(createQuizDto);

    return newQuiz;
  }

  @Get()
  async findAll() {
    const allQuizzes = await this.quizService.findAll();

    return allQuizzes;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const quiz = await this.quizService.findOne(id);

    return quiz;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    const updatedQuiz = await this.quizService.update(
      id,
      updateQuizDto,
    );

    return updatedQuiz;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedQuiz = await this.quizService.delete(id);

    return deletedQuiz;
  }
}