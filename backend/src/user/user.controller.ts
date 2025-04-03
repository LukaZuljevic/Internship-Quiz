import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserAuthGuard } from './user-auth.guard';
import { UpdatePointsDto } from './dto/update-points.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() LoginDto: LoginDto) {
    return this.userService.login(LoginDto);
  }

  @Post('register')
  register(@Body() RegisterDto: CreateUserDto) {
    return this.userService.register(RegisterDto);
  }

  @Post('points')
  @UseGuards(UserAuthGuard)
  postNewPoints(@Body() updatePointsDto: UpdatePointsDto) {
    return this.userService.updateUserPoints(updatePointsDto);
  }

  @Get()
  @UseGuards(UserAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get('points/:email')
  @UseGuards(UserAuthGuard)
  findOne(@Param('email') email: string) {
    return this.userService.getUserPoints(email);
  }
}
