import { IsNotEmpty } from 'class-validator';

export class ImportProductDto {
  @IsNotEmpty()
  product_id: string;

  @IsNotEmpty()
  product_name: string;

  @IsNotEmpty()
  size_id: string;

  @IsNotEmpty()
  size_name: string;

  @IsNotEmpty()
  color_id: string;
  
  @IsNotEmpty()
  color_name: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  imported_price_per_product: number;
}
