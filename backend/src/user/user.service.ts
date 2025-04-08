import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UpdatePointsDto } from './dto/update-points.dto';
import {
  JwtResponseDto,
  Payload,
  Role,
  UserPointsResponseDto,
} from '@appTypes/types';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(RegisterDto: RegisterDto): Promise<JwtResponseDto> {
    const oldUser = await this.prisma.user.findUnique({
      where: { email: RegisterDto.email },
    });

    if (oldUser)
      throw new BadRequestException('User with that email already exists');

    const hashedPassword = await hash(RegisterDto.password, 10);

    const registerUser = await this.prisma.user.create({
      data: {
        firstName: RegisterDto.firstName,
        lastName: RegisterDto.lastName,
        email: RegisterDto.email,
        password: hashedPassword,
      },
    });

    const payload: Payload = {
      id: registerUser.id,
      email: registerUser.email,
      role: registerUser.role as Role,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async login(LoginDto: LoginDto): Promise<JwtResponseDto> {
    const oldUser = await this.prisma.user.findUnique({
      where: { email: LoginDto.email },
    });

    if (!oldUser) throw new UnauthorizedException('Invalid email or password');

    const passwordMatch = await compare(LoginDto.password, oldUser.password);

    if (!passwordMatch)
      throw new UnauthorizedException('Invalid email or password');

    const payload: Payload = {
      email: oldUser.email,
      id: oldUser.id,
      role: oldUser.role as Role,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async findAllUserPoints(): Promise<UserPointsResponseDto[]> {
    const allUsers = await this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        totalPoints: true,
      },
      orderBy: {
        totalPoints: 'desc',
      },
    });

    if (!allUsers) throw new NotFoundException('No users found.');

    return allUsers;
  }

  async getUserPoints(email: string): Promise<UserPointsResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        totalPoints: true,
      },
    });

    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);

    return user;
  }

  async updateUserPoints(
    updatePointsDto: UpdatePointsDto,
  ): Promise<UserPointsResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: updatePointsDto.userId },
      select: {
        totalPoints: true,
      },
    });

    if (!user) throw new NotFoundException(`User not found`);

    const updatedUser = await this.prisma.user.update({
      where: { id: updatePointsDto.userId },
      data: {
        totalPoints: user.totalPoints + updatePointsDto.points,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        totalPoints: true,
      },
    });

    return updatedUser;
  }
}
