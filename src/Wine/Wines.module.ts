import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WineController } from './Wine.controller';
import { WineServices } from './Wine.services';
import { MulterModule } from '@nestjs/platform-express';
import { Wine } from './../database/entity/Wine.entity';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wine]),
    MulterModule.register({
      storage: memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB limit
      },
    }),
  ],
  providers: [WineServices],
  controllers: [WineController],
})
export class WineModule {}
