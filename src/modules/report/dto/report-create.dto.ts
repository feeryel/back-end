import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  readonly typeBug: string;
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly description: string;
  @IsOptional()
  readonly image: string;
  @IsOptional()
  readonly status: string;
}
