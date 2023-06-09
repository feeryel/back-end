import { IsNotEmpty } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  readonly Name: string;
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly subject: string;
  @IsNotEmpty()
  readonly message: string;
}
