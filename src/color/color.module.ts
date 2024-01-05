import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorController } from './color.controller';
import { Color } from './color.entity';
import { ColorService } from './color.service';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  controllers: [ColorController],
  providers: [ColorService],
})
export class ColorModule {}
