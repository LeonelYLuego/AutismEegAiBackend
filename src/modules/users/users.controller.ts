import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { HttpResponse } from '@utils/dto/http-response.dto';
import { Doc } from '@utils/decorators/doc.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from '@auth/auth/auth.decorator';
import { User } from './entities/user.entity';

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
    summary: 'Check if at least one `User` is registered',
    description: 'Checks in the database if an `User` has been created',
    errorStatus: [],
    http200: Boolean,
    bearer: false,
  })
  async findAll(): Promise<HttpResponse<boolean>> {
    return {
      data: (await this.usersService.findAll()).length > 0,
    };
  }

  @Put()
  @Doc({
    summary: 'Update the registered `User`',
    description: 'Updates the registered `User` in the database',
    errorStatus: ['400'],
    bearer: true,
    http200: ResponseUserDto,
  })
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: User,
  ): Promise<HttpResponse<ResponseUserDto>> {
    return {
      data: await this.usersService.update(updateUserDto, currentUser),
    };
  }

  @Delete()
  @Doc({
    summary: 'Delete the registered `User`',
    description: 'Deletes the registered `User in the database`',
    errorStatus: [],
    bearer: false,
  })
  async remove(): Promise<HttpResponse<void>> {
    await this.usersService.remove();
    return {};
  }
}
