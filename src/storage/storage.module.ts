import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storages } from './storage.entity';
import { Products } from 'src/products/product.entity';
import { ProductsService } from 'src/products/products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]),
    TypeOrmModule.forFeature([Storages])
  ],
  providers: [StorageService, ProductsService],
  controllers: [StorageController],
})
export class StorageModule {}
