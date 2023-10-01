import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if ((await this.findAll()).length > 0)
      throw new BadRequestException('An User already exist.');
    const salt = await bcrypt.genSalt();
    const user = await this.usersRepository.save({
      passwordHash: await bcrypt.hash(createUserDto.password, salt),
      ...createUserDto,
    });
    return await this.findOne(user.id);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (user) return user;
    throw new NotFoundException('User not found.');
  }

  async findOneBy(options: FindOneOptions<User>): Promise<User | null> {
    return await this.usersRepository.findOne(options);
  }

  async update(updateUserDto: UpdateUserDto, currentUser: User): Promise<User> {
    let passwordHash: string | undefined;
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      passwordHash = await bcrypt.hash(updateUserDto.password, salt);
      delete updateUserDto.password;
    }
    await this.usersRepository.update(
      { id: currentUser.id },
      {
        passwordHash,
        ...updateUserDto,
      },
    );
    return await this.findOne(currentUser.id);
  }

  async remove(): Promise<void> {
    await this.usersRepository.delete({});
  }
}
