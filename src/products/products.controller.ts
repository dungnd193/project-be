import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
  } from '@nestjs/common';
  import { CreateProtducDto } from './dto/create-product.dto';
  import { GetProductDto } from './dto/get-product.dto';
  import { Products } from './product.entity';
  import { ProductsService } from './products.service';
  import { Paging } from './type/products.type';
  
  @Controller('products')
  export class ProductsController {
    constructor(private productsService: ProductsService) {}
  
    @Get()
    getProductsPagination(
      @Query() query: GetProductDto,
    ): Promise<Paging<Products>> {
      return this.productsService.getProducts(query);
    }
  
    @Get('/:id')
    getProductById(@Param('id') id: string): Promise<Products> {
      return this.productsService.getProductById(id);
    }
  
    @Post()
    createProduct(@Body() createProductDto: CreateProtducDto): Promise<Products> {
      return this.productsService.createProduct(createProductDto);
    }
  
    @Delete('/:id')
    deleteProduct(@Param('id') id: string): Promise<void> {
      return this.productsService.deleteProduct(id);
    }
  
    @Put('/:id')
    updateProduct(
      @Param('id') id: string,
      @Body() product: Products,
    ): Promise<Products> {
      return this.productsService.updateProduct(id, product);
    }
  }
  