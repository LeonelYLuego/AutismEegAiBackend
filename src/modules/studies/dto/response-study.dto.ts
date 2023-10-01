import { ApiProperty } from '@nestjs/swagger';

export class ResponseStudyDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  created_on: Date;

  @ApiProperty({
    maxLength: 128,
    required: false,
  })
  result: string | null;
}
