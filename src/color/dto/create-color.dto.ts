import { IsNotEmpty } from 'class-validator';

export class CreateColorDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;
}
