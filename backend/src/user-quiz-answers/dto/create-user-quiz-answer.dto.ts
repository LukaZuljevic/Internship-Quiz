import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsJSON, IsNumber, IsString } from 'class-validator';

export class CreateUserQuizAnswerDto {
  @IsString()
  @ApiProperty()
  userId: string;

  @IsString()
  @ApiProperty()
  quizId: string;

  @ApiProperty()
  answers: Prisma.JsonObject;

  @ApiProperty()
  @IsNumber()
  points: number;
}
