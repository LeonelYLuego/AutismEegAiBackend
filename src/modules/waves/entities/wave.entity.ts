import { ApiProperty } from '@nestjs/swagger';
import { Study } from '@studies/entities/study.entity';
import { WaveType } from '@waves/enum/wave-type.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wave {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => Study, (study) => study.id)
  study: Study;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  time: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: WaveType,
  })
  type: WaveType;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  channel1: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  channel2: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  channel3: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  channel4: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  channel5: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  channel6: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  channel7: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  channel8: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  channel9: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  channel10: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  channel11: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  channel12: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  channel13: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  channel14: number;

}
