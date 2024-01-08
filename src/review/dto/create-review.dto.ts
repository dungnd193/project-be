import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  product_id: string;

  @IsNotEmpty()
  rate: number;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  avatarPath: string;
}
