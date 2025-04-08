import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { Prisma, QuestionType } from '@prisma/client';

export class CreateQuestionDto {
  @IsString()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @ApiProperty()
  type: QuestionType;

  @IsString()
  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  @IsOptional()
  options?: Prisma.JsonObject;

  @ApiProperty()
  correctAnswer: Prisma.JsonObject;
}
