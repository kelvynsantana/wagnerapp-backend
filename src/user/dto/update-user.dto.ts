import { IsString, MinLength, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  readonly id?: string;
  @IsString()
  @MinLength(3)
  @IsOptional()
  readonly name?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;
}
