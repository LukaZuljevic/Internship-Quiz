import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateQuizQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  quizId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  questionId: string;
}