import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from './size.entity';
import { CreateSizeDto } from './dto/create-size.dto';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,
  ) {}

  async getSizes(): Promise<Size[]> {
    const query = this.sizeRepository.createQueryBuilder('size');

    const sizes = await query.getMany();
    return sizes;
  }

  async createSize(sizeDto: CreateSizeDto): Promise<Size> {
    try {
      const size = this.sizeRepository.save(sizeDto);

      return size;
    } catch (error) {
      console.error(error);
    }
  }
}
