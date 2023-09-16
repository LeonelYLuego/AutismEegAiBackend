import { ApiProperty } from '@nestjs/swagger';

export class HttpResponse<T> {
  @ApiProperty()
  data?: T;

  @ApiProperty()
  error?: {
    status: number;
    timestamp: string;
    exception: any;
  };
}
