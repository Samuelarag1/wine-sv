import { UserModule } from './User/Users.module';
import { Wine } from './database/entity/Wine.entity';
import { User } from 'src/database/entity/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WineModule } from './Wine/Wines.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: 'admin',
      database: 'winesdb',
      entities: [User, Wine],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    WineModule,
  ],
})
export class AppModule {}
