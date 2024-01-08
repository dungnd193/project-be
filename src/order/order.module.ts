import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/products/product.entity';
import { ProductsService } from 'src/products/products.service';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { StorageService } from 'src/storage/storage.service';
import { Storages } from 'src/storage/storage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Products]),
    TypeOrmModule.forFeature([Storages]),
  ],
  controllers: [OrderController],
  providers: [OrderService, ProductsService, StorageService],
})
export class OrderModule {}
