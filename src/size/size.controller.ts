import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { Size } from './size.entity';
import { SizeService } from './size.service';

@Controller('size')
export class SizeController {
  constructor(private sizeService: SizeService) {}
  @Get()
  getSizes(): Promise<Size[]> {
    return this.sizeService.getSizes();
  }

  @Post()
  createSize(@Body() createSizeDto: CreateSizeDto) {
    return this.sizeService.createSize(createSizeDto);
  }
}
