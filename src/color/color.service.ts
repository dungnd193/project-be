import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from './color.entity';
import { CreateColorDto } from './dto/create-color.dto';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
  ) {}

  async getColors(): Promise<Color[]> {
    const query = this.colorRepository.createQueryBuilder('color');

    const colors = await query.getMany();
    return colors;
  }

  async createColor(colorDto: CreateColorDto): Promise<Color> {
    try {
      const color = this.colorRepository.save(colorDto);

      return color;
    } catch (error) {
      console.error(error);
    }
  }
}
