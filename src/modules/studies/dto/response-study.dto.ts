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
  result: number | null;
}
