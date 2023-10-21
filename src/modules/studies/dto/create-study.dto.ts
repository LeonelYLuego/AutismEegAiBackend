import { ApiProperty } from '@nestjs/swagger';

export class CreateStudyDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  study: any;
}
