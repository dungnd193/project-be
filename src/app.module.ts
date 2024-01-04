import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configValidationSchema } from './config.schema';
import { ProductModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ColorModule } from './color/color.module';
import { SizeModule } from './size/size.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { StorageModule } from './storage/storage.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ProductModule,
    CategoriesModule,
    ColorModule,
    SizeModule,
    UploadModule,
    AuthModule,
    OrderModule,
    StorageModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
