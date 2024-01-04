import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductModule {}
