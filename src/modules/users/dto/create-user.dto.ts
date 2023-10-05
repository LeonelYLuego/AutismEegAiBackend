import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    maxLength: 128,
  })
  @IsString()
  @MaxLength(128)
  name: string;

  @ApiProperty({
    maxLength: 128,
  })
  @IsString()
  @IsEmail()
  @MaxLength(128)
  email: string;

  @ApiProperty({
    maxLength: 128,
  })
  @IsString()
<<<<<<< HEAD
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
  //   message:
  //     'Invalid Password, minimum eight characters, at least one uppercase letter, one lowercase letter and one number.',
  // })
=======
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Invalid Password, minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and no special characters.',
  })
>>>>>>> 9f06da5799a6f9cc5204483af963df33b9653186
  password: string;
}
