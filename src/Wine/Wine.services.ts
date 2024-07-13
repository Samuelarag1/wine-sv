import { IMWines } from './../models/Wine';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Wine } from 'src/database/entity/Wine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createWineDTO } from './dto/wine.dto';

@Injectable()
export class WineServices {
  constructor(
    @InjectRepository(Wine) private wineRepository: Repository<Wine>,
  ) {}

  create(body: createWineDTO) {
    return this.wineRepository.save(body);
  }

  async findAll(): Promise<IMWines[]> {
    return this.wineRepository.find();
  }

  findOne(id: number): Promise<Wine | null> {
    return this.wineRepository.findOneBy({ id });
  }

  async removeWine(id: number): Promise<void> {
    this.wineRepository.delete(id);
  }
}
