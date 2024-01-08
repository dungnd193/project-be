import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderService } from './order.service';
import { Body, Controller, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetSuccessfulOrdersInTimeRangeDto } from './dto/get-successful-orders-in-time-range.dto';
import { GetOrdersByUserIdDto } from './dto/get-orders-by-user-id.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get()
  getOrders(): Promise<Order[]> {
    return this.orderService.getOrders();
  }

  @Get('my-orders')
  getOrdersByUserId(
    @Query() params: GetOrdersByUserIdDto
  ): Promise<Order[]> {
    const { userId } = params
    return this.orderService.getOrdersByUserId(userId);
  }

  @Get('rangeTime')
  getSuccessfulOrdersInTimeRange(
    @Query() dateRange: GetSuccessfulOrdersInTimeRangeDto
  ): Promise<any[]> {
    const { startDate, endDate, productId } = dateRange;
    return this.orderService.getSuccessfulOrdersInTimeRange(startDate, endDate, productId);
  }
  @Post()
  createOrder(@Body() createColorDto: CreateOrderDto) {
    return this.orderService.createOrder(createColorDto);
  }

  @Put(':id/status')
  updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    const { status } = updateOrderStatusDto;
    return this.orderService.updateOrderStatus(id, status);
  }
}
