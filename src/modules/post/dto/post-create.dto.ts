import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  readonly label1: string;
  @IsNotEmpty()
  readonly label2: string;
  @IsNotEmpty()
  readonly label3: string;
  @IsNotEmpty()
  readonly label4: string;
  @IsNotEmpty()
  readonly label5: string;
  @IsNotEmpty()
  readonly jobTitle: string;
  @IsNotEmpty()
  readonly description: string;
}
