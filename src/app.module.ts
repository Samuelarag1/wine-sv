import { Files } from './database/entity/File.entity';
import { UserModule } from './User/Users.module';
import { Wine } from './database/entity/Wine.entity';
import { User } from 'src/database/entity/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WineModule } from './Wine/Wines.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './Files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'mysql_db',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'winesdb',
      entities: [User, Wine, Files],
      synchronize: false,
      autoLoadEntities: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/uploads'),
      serveRoot: '/uploads',
    }),
    UserModule,
    WineModule,
    AuthModule,
    FilesModule,
  ],
})
export class AppModule {}
