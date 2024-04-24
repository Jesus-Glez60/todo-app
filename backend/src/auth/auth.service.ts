import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, CreateUserDto } from './dto';

@Injectable()
export class AuthService {
  private jwtSecret: string;

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {
    this.jwtSecret =
      this.config.get('JWT_SECRET');
  }

  async signup(dto: CreateUserDto) {
    const hash = await argon.hash(dto.password);

    const user = await this.createUser(
      dto.firstName,
      dto.lastName,
      dto.email,
      hash,
    );

    return this.signToken(user.id, user.email);
  }

  private async createUser(
    email: string,
    hash: string,
    firstName?: string,
    lastName?: string,
  ) {
    try {
      return await this.prisma.user.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          hash: hash,
        },
      });
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (!user)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );

    if (!pwMatches)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: this.jwtSecret,
      },
    );

    return { access_token: token };
  }
}
