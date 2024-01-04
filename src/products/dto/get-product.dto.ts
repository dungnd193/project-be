import { IsOptional } from 'class-validator';

export class GetProductDto {
  @IsOptional()
  page?: number;
  
  @IsOptional()
  size?: number;

  @IsOptional()
  orderBy?: string;

  @IsOptional()
  sort?: 'DESC' | 'ASC';

  @IsOptional()
  start?: number;

  @IsOptional()
  end?: number;

  @IsOptional()
  colorId?: string;

  @IsOptional()
  categoryId?: string;

  @IsOptional()
  name?: string;
}
