import { IsNumber, IsString } from 'class-validator';

export class UpdatePointsDto {
  @IsString()
  userId: string;

  @IsNumber()
  points: number;
}
