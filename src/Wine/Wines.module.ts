import { Wine } from './../database/entity/Wine.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WineController } from './Wine.controller';
import { WineServices } from './Wine.services';

@Module({
  imports: [TypeOrmModule.forFeature([Wine])],
  providers: [WineServices],
  controllers: [WineController],
})
export class WineModule {}
