import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';
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

  @IsNumber()
  @ApiProperty()
  min?: number;

  @IsNumber()
  @ApiProperty()
  max?: number;

  @IsNumber()
  @ApiProperty()
  step?: number;

  @ApiProperty()
  options?: Prisma.JsonObject;

  @ApiProperty()
  correctAnswer: Prisma.JsonObject;
}
