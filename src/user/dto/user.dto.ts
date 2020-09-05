import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
