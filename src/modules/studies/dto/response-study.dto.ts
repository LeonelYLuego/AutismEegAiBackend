import { ApiProperty } from '@nestjs/swagger';

export class ResponseStudyDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdOn: Date;

  @ApiProperty({
    minimum: 0,
    maximum: 100,
    required: false,
  })
  executiveFunction: number | null;

  @ApiProperty({
    minimum: 0,
    maximum: 100,
    required: false,
  })
  sensoryProcessing: number | null;

  @ApiProperty({
    minimum: 0,
    maximum: 100,
    required: false,
  })
  repetitiveBehaviours: number | null;

  @ApiProperty({
    minimum: 0,
    maximum: 100,
    required: false,
  })
  motorSkills: number | null;

  @ApiProperty({
    minimum: 0,
    maximum: 100,
    required: false,
  })
  perseverativeThinking: number | null;

  @ApiProperty({
    minimum: 0,
    maximum: 100,
    required: false,
  })
  socialAwareness: number | null;

  @ApiProperty({
    minimum: 0,
    maximum: 100,
    required: false,
  })
  verbalNoVerbalCommunication: number | null;

  @ApiProperty({
    minimum: 0,
    maximum: 100,
    required: false,
  })
  informationProcessing: number | null;
}
