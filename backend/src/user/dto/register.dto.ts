import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
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
  @MinLength(6)
  @ApiProperty()
  password: string;
}
