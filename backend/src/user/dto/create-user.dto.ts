import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  firstName: string;

  @IsString()
  @MinLength(1)
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(4)
  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;

  @IsNumber()
  @ApiProperty()
  totalPoints: number;
}
