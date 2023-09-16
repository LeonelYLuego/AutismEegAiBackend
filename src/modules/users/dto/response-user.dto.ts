import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty({
    maxLength: 128,
  })
  name: string;

  @ApiProperty({
    maxLength: 128,
  })
  email: string;
}
