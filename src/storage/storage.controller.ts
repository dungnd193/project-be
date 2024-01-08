import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StorageService } from './storage.service';
import { GetImportedProductInTimeRangeDto } from './dto/get-imported-product-in-time-range.dto';
import { ImportProductDto } from './dto/import-product.dto';

@Controller('storage')
export class StorageController {
    constructor(private storageService: StorageService) { }

    @Get('/rangeTime')
    getImportedProductInTimeRange(
        @Query() dateRange: GetImportedProductInTimeRangeDto
    ): Promise<any> {
        const { startDate, endDate, productId, flag } = dateRange;
        return this.storageService.getImportedProductInTimeRange(startDate, endDate, productId, flag);
    }
    

    @Post()
    saveImportProduct(@Body() importProduct: ImportProductDto) {
        return this.storageService.saveImportProduct(importProduct)
    }
}