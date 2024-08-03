import { memoryStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { Files } from './../database/entity/File.entity';
import { Wine } from 'src/database/entity/Wine.entity';
import { User } from 'src/database/entity/User.entity';
import { Module } from '@nestjs/common';
import { UserService } from './User.services';
import { UserController } from './User.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Wine, Files]),
    MulterModule.register({
      storage: memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
