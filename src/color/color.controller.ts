import { CreateColorDto } from './dto/create-color.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Color } from './color.entity';
import { ColorService } from './color.service';

@Controller('color')
export class ColorController {
  constructor(private colorService: ColorService) {}
  @Get()
  getColors(): Promise<Color[]> {
    return this.colorService.getColors();
  }

  @Post()
  createColor(@Body() createColorDto: CreateColorDto) {
    return this.colorService.createColor(createColorDto);
  }
}
