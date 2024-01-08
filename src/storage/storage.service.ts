import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Storages } from './storage.entity';
import { ImportProductDto } from './dto/import-product.dto';
import { startOfDay, endOfDay } from 'date-fns';
import { ProductsService } from 'src/products/products.service';
import { Products } from 'src/products/product.entity';

@Injectable()
export class StorageService {
    constructor(
        @InjectRepository(Storages)
        private storagesRepository: Repository<Storages>,
        private productService: ProductsService

    ) { }

    async saveImportProduct(importProduct: ImportProductDto) {
        try {
            const p = await this.productService.getProductById(importProduct.product_id);
            p.quantity.forEach(i => {
                if (i.sizeId === importProduct.size_id && i.colorId === importProduct.color_id) {
                    i.quantity += importProduct.quantity
                }
            })
            await this.productService.updateProduct(importProduct.product_id, p);
            await this.storagesRepository.save(importProduct);
        } catch (error) {
            console.error(`Import product error: `, error);
        }
    }

    async getImportedProductForDay(date: Date, productId?: string, flag?: any): Promise<any[]|any> {
        const startOfCurrentDay = startOfDay(date);
        const endOfCurrentDay = endOfDay(date);

        const query = this.storagesRepository.createQueryBuilder('storage');
        const importedProductForDay = await query
            .where({
                createdAt: Between(startOfCurrentDay, endOfCurrentDay),
            })
            .getMany();

        const quantityImportedProductForDay = productId ? importedProductForDay.filter(p => p.product_id === productId).reduce((acc, p) => {
            return acc + p.quantity
        }, 0) : importedProductForDay.reduce((acc, p) => {
            return acc + p.quantity
        }, 0)

        return parseInt(flag)===0 ?  { date: startOfCurrentDay, quantity: quantityImportedProductForDay } : importedProductForDay;
    }

    async getImportedProductInTimeRange(startDate: Date, endDate: Date, productId?: string, flag?: any): Promise<{ date: Date; quantity: number }[]> {
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        let daysArray = [];
        let currentDate = parsedStartDate;

        while (currentDate <= parsedEndDate) {
            const resultForDay = await this.getImportedProductForDay(currentDate, productId, flag);
            if (!parseInt(flag)) {
                // flag = 0
                daysArray.push(resultForDay);
            } else {
                // flag = 1
                daysArray = resultForDay.length ? [...daysArray, ...resultForDay] : [...daysArray]
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return daysArray;
    }
}
