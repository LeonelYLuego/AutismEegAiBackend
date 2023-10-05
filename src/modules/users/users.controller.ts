import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { HttpResponse } from '@utils/dto/http-response.dto';
import { Doc } from '@utils/decorators/doc.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Doc({
    summary: 'Create an `User`',
    description: 'Creates a new `User` in the database',
    errorStatus: ['400'],
    bearer: false,
    http201: ResponseUserDto,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<HttpResponse<ResponseUserDto>> {
    return {
      data: await this.usersService.create(createUserDto),
    };
  }

  @Get()
  @Doc({
    summary: 'Check if at least one `User` is registered.',
    description: 'Checks in the database if an `User` has been created.',
    errorStatus: [],
    http200: Boolean,
    bearer: false,
  })
  async findAll(): Promise<HttpResponse<boolean>> {
    return {
      data: (await this.usersService.findAll()).length > 0,
    };
  }
}
