import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';

@Controller('quiz-question')
export class QuizQuestionController {
  constructor(private readonly quizQuestionService: QuizQuestionService) {}

  @Post()
  async create(@Body() createQuizQuestionDto: CreateQuizQuestionDto) {
    const newQuizQuestion = await this.quizQuestionService.create(createQuizQuestionDto);
    
    return newQuizQuestion;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const quizQuestion = await this.quizQuestionService.findOne(id);
    
    return quizQuestion;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedQuizQuestion = await this.quizQuestionService.remove(id);
    
    return deletedQuizQuestion;
  }

}