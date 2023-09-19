import { ApiProperty } from '@nestjs/swagger';
import { Study } from '@studies/entities/study.entity';
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
    type: 'float',
  })
  fp1: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  af3: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  f3: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  f7: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  fc5: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  fc1: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  c3: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  t7: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  cp5: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  cp1: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  p3: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  p7: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  po3: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  o1: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  oz: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  pz: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  fp2: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  af4: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  fz: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  f4: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  f8: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  fc6: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  fc2: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  cz: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  c4: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  t8: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  cp6: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  cp2: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  p4: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  p8: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  po4: number;

  @ApiProperty()
  @Column({
    type: 'float',
  })
  o2: number;
}
