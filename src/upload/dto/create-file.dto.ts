import { IsNotEmpty } from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  originalName: string;

  @IsNotEmpty()
  fileName: string;
}
