import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePointsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  points: number;
}
