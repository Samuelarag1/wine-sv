import { IMWines } from './../models/Wine';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { WineServices } from './Wine.services.js';
import { createWineDTO } from './dto/wine.dto.js';

@Controller()
export class WineController {
  constructor(private readonly wineService: WineServices) {}

  @Post('wines')
  createWine(@Body() createWine: createWineDTO) {
    this.wineService.create(createWine);
  }

  @Get('wines')
  async findAllWines(): Promise<IMWines[]> {
    return this.wineService.findAll();
  }
}
