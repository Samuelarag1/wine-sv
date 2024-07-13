import { Wine } from 'src/database/entity/Wine.entity';
import { User } from 'src/database/entity/User.entity';
import { Module } from '@nestjs/common';
import { UserService } from './User.services';
import { UserController } from './User.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wine])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
