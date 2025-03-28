import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma, QuestionType } from '@prisma/client';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  type?: QuestionType;

  @ApiPropertyOptional()
  categoryId?: string;

  @ApiPropertyOptional()
  min?: number;

  @ApiPropertyOptional()
  max?: number;

  @ApiPropertyOptional()
  step?: number;

  @ApiPropertyOptional()
  options?: Prisma.JsonObject;

  @ApiPropertyOptional()
  correctAnswer?: Prisma.JsonObject;
}
