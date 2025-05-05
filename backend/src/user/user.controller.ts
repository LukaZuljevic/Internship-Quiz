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

  @Post('login')
  async login(@Body() LoginDto: LoginDto): Promise<JwtResponseDto> {
    return await this.userService.login(LoginDto);
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
