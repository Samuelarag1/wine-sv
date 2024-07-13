import { Wine } from 'src/database/entity/Wine.entity';
import { User } from 'src/database/entity/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/User/User.services';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wine])],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
