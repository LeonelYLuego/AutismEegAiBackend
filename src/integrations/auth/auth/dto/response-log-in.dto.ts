import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from '@users/dto/response-user.dto';

export class ResponseLogInDto {
  @ApiProperty()
  user: ResponseUserDto;

  @ApiProperty()
  token: string;
}
