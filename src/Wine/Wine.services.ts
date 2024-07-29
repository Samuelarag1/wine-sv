import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Wine } from 'src/database/entity/Wine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createWineDTO } from './dto/wine.dto';
import { promises as fsPromises } from 'fs';
import { join } from 'path';

@Injectable()
export class WineServices {
  constructor(
    @InjectRepository(Wine) private wineRepository: Repository<Wine>,
  ) {}

  async create(
    createWineDto: createWineDTO,
    image: Express.Multer.File,
  ): Promise<Wine> {
    if (!image || !image.buffer) {
      throw new Error('No image file provided or file buffer is empty');
    }

    // Use the correct path relative to the project root
    const uploadPath = join(__dirname, '../../uploads', image.originalname);

    try {
      await fsPromises.writeFile(uploadPath, image.buffer); // Save the image to the specified path
    } catch (error) {
      console.error('Error writing file:', error);
      throw new Error('Failed to save the image');
    }

    const wine = new Wine();
    wine.name = createWineDto.name;
    wine.year = createWineDto.year;
    wine.type = createWineDto.type;
    wine.description = createWineDto.description;
    wine.price = createWineDto.price;
    wine.userId = createWineDto.userId;
    wine.image = uploadPath; // Store the path of the uploaded image
    await this.wineRepository.save(wine);

    return wine;
  }

  async findAll(): Promise<Wine[]> {
    return this.wineRepository.find();
  }

  findOne(id: number): Promise<Wine[] | null> {
    const wine = this.wineRepository.findBy({ userId: id });
    return wine;
  }

  async removeWine(id: number): Promise<void> {
    await this.wineRepository.delete(id);
  }
}
