import { ApiProperty } from '@nestjs/swagger';
import { Study } from '@studies/entities/study.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient {
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

  @ApiProperty()
  @Column()
  age: number;

  // @OneToMany(() => Study, (study) => study.patient)
  // studies: Study[];
}
