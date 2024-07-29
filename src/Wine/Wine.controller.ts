import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { WineServices } from './Wine.services';
import { createWineDTO } from './dto/wine.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('wines')
export class WineController {
  constructor(private readonly wineService: WineServices) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createWineDto: createWineDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.wineService.create(createWineDto, image);
  }
  @Get()
  async findAllWines() {
    return this.wineService.findAll();
  }

  @Get(':id')
  async getWine(@Param('id') id: number) {
    const wine = await this.wineService.findOne(id);
    return wine;
  }
}
