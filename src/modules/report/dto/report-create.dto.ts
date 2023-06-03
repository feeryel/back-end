import { IsNotEmpty } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  readonly typeBug: string;
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly description: string;
  @IsNotEmpty()
  readonly image: string;
}
