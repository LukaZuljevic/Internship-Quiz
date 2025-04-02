import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserAuthGuard } from './user-auth.guard';

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
