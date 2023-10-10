import { ApiProperty } from '@nestjs/swagger';
import { WaveType } from '@waves/enum/wave-type.enum';
import { Column } from 'typeorm';

export class ResponseWaveDto {
  @ApiProperty()
  @Column({
    type: 'string',
  })
  id: string;

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
