import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, Max, MaxLength } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({
    maxLength: 128,
  })
  @IsString()
  @MaxLength(128)
  name: string;

  @ApiProperty({
    minimum: 0,
    maximum: 100,
  })
  @IsInt()
  @IsPositive()
  @Max(100)
  age: number;
}
