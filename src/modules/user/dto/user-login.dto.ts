import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class UseLoginDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
}
