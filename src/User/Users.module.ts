import { User } from 'src/database/entity/User.entity';
import { UserProviders } from './User.providers';
import { DataBaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { UserService } from './User.services';
import { UserController } from './User.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
