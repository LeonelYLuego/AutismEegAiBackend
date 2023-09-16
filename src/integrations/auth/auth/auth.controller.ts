import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Doc } from '@utils/decorators/doc.decorator';
import { HttpResponse } from '@utils/dto/http-response.dto';
import { ResponseLogInDto } from './dto/response-log-in.dto';
import { LogInDto } from './dto/log-in.dto';
import { AuthService } from './auth.service';
import { ResponseUserDto } from '@users/dto/response-user.dto';
import { CurrentUser } from './auth.decorator';
import { User } from '@users/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('log-in')
  @Doc({
    summary: 'Log in an `User`',
    description:
      'Checks the `User` credentials and returns it with a bearer token',
    errorStatus: ['401'],
    http201: ResponseLogInDto,
    bearer: false,
  })
  async logIn(
    @Body() logInDto: LogInDto,
  ): Promise<HttpResponse<ResponseLogInDto>> {
    return {
      data: await this.authService.logIn(logInDto),
    };
  }

  @Get('logged')
  @Doc({
    summary: 'Get the current logged `User`',
    description: 'Gets the current logged `User` based on the token',
    errorStatus: [],
    http200: ResponseUserDto,
  })
  logged(@CurrentUser() currentUser: User): HttpResponse<ResponseUserDto> {
    return {
      data: currentUser,
    };
  }
}
