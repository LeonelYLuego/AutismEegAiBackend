import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/users.service';
import { LogInDto } from './dto/log-in.dto';
import * as bcrypt from 'bcrypt';
import { ResponseLogInDto } from './dto/response-log-in.dto';
import { User } from '@users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(credentials: LogInDto): Promise<ResponseLogInDto> {
    let user = await this.usersService.findOneBy({
      select: {
        id: true,
        passwordHash: true,
      },
      where: {
        email: credentials.email,
      },
    });
    if (user) {
      if (await bcrypt.compare(credentials.password, user.passwordHash)) {
        user = await this.usersService.findOne(user.id);
        const payload = {
          user,
        };
        return {
          token: await this.jwtService.signAsync(payload),
          user,
        };
      }
    }
    throw new UnauthorizedException();
  }

  async logged(token: string): Promise<User | null> {
    try {
      const payload = (await this.jwtService.verifyAsync(token)).user as User;
      const user = await this.usersService.findOneBy({
        where: {
          id: payload.id,
        },
      });
      if (user) return user;
    } catch {
      return null;
    }
    return null;
  }
}
