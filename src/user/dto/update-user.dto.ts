import { IsString, MinLength, IsEmail } from 'class-validator';

export class UpdateUserDTO {
  readonly id?: string;
  @IsString()
  @MinLength(3)
  readonly name: string;

  @IsEmail()
  readonly email: string;
}
