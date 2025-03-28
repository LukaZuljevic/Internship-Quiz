import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizDto } from './create-quiz.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  categoryId?: string;
}
