import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '@patients/entities/patient.entity';
import { ResponseWaveDto } from '@waves/dto/response-wave.dto';
import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Study {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ApiProperty({
  //   type: Patient,
  // })
  @ManyToOne(() => Patient, (patient) => patient.id)
  patient: Patient;

  @ApiProperty()
  @CreateDateColumn()
  created_on: Date;

  @ApiProperty({
    maxLength: 128,
    required: false,
  })
  @Column({
    length: 128,
    nullable: true,
  })
  result: string | null;

  @ApiProperty({
    type: ResponseWaveDto,
    isArray: true,
  })
  waves: ResponseWaveDto[];
}
