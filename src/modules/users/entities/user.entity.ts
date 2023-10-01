import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    maxLength: 128,
  })
  @Column({
    length: 128,
  })
  name: string;

  @ApiProperty({
    maxLength: 128,
  })
  @Column({
    length: 128,
  })
  email: string;

  @ApiProperty({
    maxLength: 128,
  })
  @Column({
    length: 128,
    select: false,
  })
  passwordHash: string;
}
