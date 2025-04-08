import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
