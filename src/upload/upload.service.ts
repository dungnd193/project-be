import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { Upload } from './upload.entity';
@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>,
  ) {}

  async getFiles(): Promise<Upload[]> {
    const query = this.uploadRepository.createQueryBuilder('upload');

    const files = await query.getMany();
    return files;
  }

  async createFileUpload(fileDto: CreateFileDto): Promise<Upload> {
    try {
      const file = this.uploadRepository.save(fileDto);

      return file;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteFile(fileName: string): Promise<void> {
    const result = await this.uploadRepository.delete({ fileName });

    // success is affected === 1, fail is affected === 0
    if (!result.affected) {
      throw new NotFoundException(`File "${fileName}" not found`);
    }
    fs.unlink(`./uploads/product-images/${fileName}`, (err) => {
      if (err) throw Error('Delete file error');
      console.log(`fileName ${fileName} was deleted`);
    });
    throw new HttpException('Delete file successful', HttpStatus.OK);
  }
}
