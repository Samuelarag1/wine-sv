import { Module } from '@nestjs/common';
import { UserModule } from './Users.module';
import { UserService } from './User.services';
import { UserController } from './User.controller';

@Module({
  imports: [UserModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserHttpModule {}
