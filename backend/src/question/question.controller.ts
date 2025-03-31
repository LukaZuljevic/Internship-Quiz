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
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { UserAuthGuard } from 'src/user/user-auth.guard';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseGuards(UserAuthGuard)
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    const newQuestion = await this.questionService.create(createQuestionDto);

    return newQuestion;
  }

  @Get()
  @UseGuards(UserAuthGuard)
  async findAll() {
    const allQuestions = await this.questionService.findAll();

    return allQuestions;
  }

  @Get(':id')
  @UseGuards(UserAuthGuard)
  async findOne(@Param('id') id: string) {
    const question = await this.questionService.findOne(id);

    return question;
  }

  @Patch(':id')
  @UseGuards(UserAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    const updatedQuestion = await this.questionService.update(
      id,
      updateQuestionDto,
    );

    return updatedQuestion;
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard)
  async delete(@Param('id') id: string) {
    const deletedQuestion = await this.questionService.delete(id);

    return deletedQuestion;
  }
}
