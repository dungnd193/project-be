import { IsEnum } from 'class-validator';
import { EOrderStatus } from '../type/order.type';

export class UpdateOrderStatusDto {
  @IsEnum(EOrderStatus)
  status: EOrderStatus;
}
