import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly firstName: string;
  @IsNotEmpty()
  readonly lastName: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
  @IsNotEmpty()
  readonly birthday: Date;
  @IsNotEmpty()
  readonly profileimage: string;
  @IsNotEmpty()
  readonly bannerimage: string;
  @IsOptional()
  readonly biography: string;
}
