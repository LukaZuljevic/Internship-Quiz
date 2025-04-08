import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { UserAuthGuard } from './user-auth.guard';
import { UpdatePointsDto } from './dto/update-points.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() LoginDto: LoginDto) {
    return this.userService.login(LoginDto);
  }

  @Post('register')
  register(@Body() RegisterDto: RegisterDto) {
    return this.userService.register(RegisterDto);
  }

  @Post('points')
  @UseGuards(UserAuthGuard)
  postNewPoints(@Body() updatePointsDto: UpdatePointsDto) {
    return this.userService.updateUserPoints(updatePointsDto);
  }

  @Get()
  @UseGuards(UserAuthGuard)
  getAllUserPoints() {
    return this.userService.findAllUserPoints();
  }

  @Get('points/:email')
  @UseGuards(UserAuthGuard)
  findOne(@Param('email') email: string) {
    return this.userService.getUserPoints(email);
  }
}
