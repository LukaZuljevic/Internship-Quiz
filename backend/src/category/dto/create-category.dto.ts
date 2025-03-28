import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(2)
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  imageUrl?: string;
}
