import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { UserAuthGuard } from './user-auth.guard';
import { UpdatePointsDto } from './dto/update-points.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtResponseDto, UserPointsResponseDto } from '../appGlobalTypes';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('login')
  // async login(@Body() LoginDto: LoginDto): Promise<JwtResponseDto> {
  //   return await this.userService.login(LoginDto);
  // }

  // In your user.controller.ts or wherever your login endpoint is defined

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<JwtResponseDto> {
    try {
      // Your existing login logil
      return await this.userService.login(loginDto);
    } catch (error) {
      // Detailed error logging
      console.error('Login Error Details:', {
        message: error.message,
        stack: error.stack,
        code: error.code, // Prisma error code if available
        meta: error.meta, // Prisma metadata if available
        timestamp: new Date().toISOString(),
        loginData: { ...loginDto, password: '***REDACTED***' }, // Log request data without the password
      });

      // For database connection errors
      if (error.code?.includes('P1001') || error.message?.includes('connect')) {
        throw new HttpException(
          'Database connection failed. Please try again later.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      // For authentication errors
      if (
        error.message?.includes('password') ||
        error.message?.includes('credentials')
      ) {
        throw new HttpException(
          'Invalid username or password',
          HttpStatus.UNAUTHORIZED,
        );
      }

      // Generic error with useful details
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Login failed',
          message:
            process.env.NODE_ENV === 'production'
              ? 'An unexpected error occurred during login'
              : error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('register')
  async register(@Body() RegisterDto: RegisterDto): Promise<JwtResponseDto> {
    return await this.userService.register(RegisterDto);
  }

  @Post('points')
  @UseGuards(UserAuthGuard)
  async postNewPoints(
    @Body() updatePointsDto: UpdatePointsDto,
  ): Promise<UserPointsResponseDto> {
    return await this.userService.updateUserPoints(updatePointsDto);
  }

  @Get()
  @UseGuards(UserAuthGuard)
  async getAllUserPoints(): Promise<UserPointsResponseDto[]> {
    return await this.userService.findAllUserPoints();
  }

  @Get('points/:email')
  @UseGuards(UserAuthGuard)
  async findOne(@Param('email') email: string): Promise<UserPointsResponseDto> {
    return await this.userService.getUserPoints(email);
  }
}
