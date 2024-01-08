import { IsNotEmpty, IsOptional } from 'class-validator';
import { IOrderItem } from '../type/order.type';

export class CreateOrderDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  user_name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  postcode: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  email: string;

  @IsOptional()
  note: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  payment_method: string;

  @IsNotEmpty()
  discount: string;

  @IsNotEmpty()
  order_list: IOrderItem[];
}
