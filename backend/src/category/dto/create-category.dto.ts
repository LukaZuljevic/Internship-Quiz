import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(2)
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  imageUrl?: string;
}
