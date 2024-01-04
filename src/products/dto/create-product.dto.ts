import { IsNotEmpty, IsOptional } from 'class-validator';
import { EProductStatus } from '../type/product-status.enum';
import { IQuantity } from '../type/products.type';

export  class CreateProtducDto {
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    description: string;
  
    @IsNotEmpty()
    code: string;
  
    @IsNotEmpty()
    quantity: IQuantity[];

    @IsNotEmpty()
    category: { id: string; name: string };
  
    @IsNotEmpty()
    price: number;
  
    @IsNotEmpty()
    brand: string;
  
    @IsOptional()
    discount: number;
    @IsNotEmpty()
    viewCount: number;
  
    @IsOptional()
    nameUrlImage: string[];
  }

    

    