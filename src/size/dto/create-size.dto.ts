import { IsNotEmpty } from 'class-validator';

export class CreateSizeDto {
  @IsNotEmpty()
  name: string;
}
