import { ApiProperty } from '@nestjs/swagger';

export class CreateStudyDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The csv file to upload',
  })
  csv: Express.Multer.File;
}
