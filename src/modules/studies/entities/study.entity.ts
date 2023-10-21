import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '@patients/entities/patient.entity';
import { ResponseWaveDto } from '@waves/dto/response-wave.dto';
import { Wave } from '@waves/entities/wave.entity';
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

  @ManyToOne(() => Patient, (patient) => patient.id, {
    onDelete: 'CASCADE',
  })
  patient: Patient;

  @ApiProperty()
  @CreateDateColumn()
  createdOn: Date;

  @ApiProperty({
    type: [ResponseWaveDto],
  })
  @OneToMany(() => Wave, (wave) => wave.study)
  waves: Wave[];

  @ApiProperty({
    minimum: 0,
    maximum: 100,
    required: false,
  })
  @Column({
    type: 'float',
    nullable: true,
  })
  result: number | null;
}
