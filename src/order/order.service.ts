import { EOrderStatus } from './type/order.type';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { Products } from 'src/products/product.entity';
import { ProductsService } from 'src/products/products.service';
import { startOfDay, endOfDay } from 'date-fns';

@Injectable()
export class OrderService {
  constructor(
    private productsService: ProductsService,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) { }

  async getOrders(): Promise<Order[]> {
    const query = this.orderRepository.createQueryBuilder('order');

    const orders = await query.orderBy({ 'order.createdAt': 'DESC' }).getMany();
    return orders;
  }

  async getOrderById(id: string): Promise<Order> {
    const task = await this.orderRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  async createOrder(orderDto: CreateOrderDto): Promise<Order> {
    try {
      for (const order of orderDto.order_list) {
        const data = await this.productsService.getProductById(order.id);
        for (const d of data.quantity) {
          if (d.sizeId === order.sizeId && d.colorId === order.colorId) {
            d.quantity -= order.quantity;
            if (d.quantity < 0) {
              // If the quantity becomes negative, return a custom error response
              return Promise.reject('Vui long kiem tra lai so luong san pham ' + data.name);
            }
          }
        }
        await this.productsRepository.save(data);
      }
  
      const order = await this.orderRepository.save(orderDto);
      return order;
    } catch (error) {
      console.error(error);
  
      // Handle other errors or log them if needed
  
      // Return a custom error response for unhandled exceptions
      return Promise.reject('Something went wrong while processing the order');
    }
  }
  

  async getOrdersForDay(date: Date, productId?: string): Promise<{ date: Date; quantity: number }> {
    const startOfCurrentDay = startOfDay(date);
    const endOfCurrentDay = endOfDay(date);
  
    const query = this.orderRepository.createQueryBuilder('order');
    const ordersForDay = await query
      .where({
        status: 'COMPLETED',
        createdAt: Between(startOfCurrentDay, endOfCurrentDay),
      })
      .getMany();
  
    const quantityForDay = ordersForDay.reduce((acc, order) => {
      return (
        acc +
        order.order_list.reduce((orderAcc, orderItem) => {
          if (!productId || orderItem.id === productId) {
            return orderAcc + orderItem.quantity;
          }
          return orderAcc;
        }, 0)
      );
    }, 0);
  
    return { date: startOfCurrentDay, quantity: quantityForDay };
  }

  async getSuccessfulOrdersInTimeRange(startDate: Date, endDate: Date, productId?: string): Promise<{ date: Date; quantity: number }[]> {
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
  
    const daysArray = [];
    let currentDate = parsedStartDate;
  
    while (currentDate <= parsedEndDate) {
      const resultForDay = await this.getOrdersForDay(currentDate, productId);
      daysArray.push(resultForDay);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return daysArray;
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const query = this.orderRepository.createQueryBuilder('order');
    const orders = await query
      .where({
        user_id: userId
      })
      .orderBy({
        'order.createdAt': 'DESC'
      })
      .getMany();

    return orders
  }

  async updateOrderStatus(id: string, status: EOrderStatus): Promise<Order> {
    const order = await this.getOrderById(id);
    order.status = status;
    await this.orderRepository.save(order);
    return order;
  }
}
