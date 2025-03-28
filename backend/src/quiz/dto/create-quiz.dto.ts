import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  categoryId: string;
}