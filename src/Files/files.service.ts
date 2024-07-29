import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Files } from '../database/entity/File.entity';
import { User } from '../database/entity/User.entity';
import { Wine } from '../database/entity/Wine.entity';
import * as multer from 'multer';
import { extname } from 'path';
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import { Readable } from 'stream';

dotenv.config();
@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files)
    private filesRepository: Repository<Files>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Wine) private winesRepository: Repository<Wine>,
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  }

  private storage = multer.memoryStorage(); // Store files in memory

  private upload = multer({ storage: this.storage });

  async uploadPhoto(file: Express.Multer.File, userId: number, wineId: number) {
    try {
      if (!file) {
        throw new Error('No file provided');
      }

      const bufferStream = new Readable();
      bufferStream.push(file.buffer);
      bufferStream.push(null);

      const uniqueFilename = `${Date.now()}_${file.originalname}`;
      const uploadResult = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { public_id: uniqueFilename },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        bufferStream.pipe(stream);
      });

      if (!uploadResult) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const newPhoto = new Files();
      newPhoto.filename = uploadResult.original_filename;
      newPhoto.url = uploadResult.secure_url;

      if (userId) {
        const user = await this.usersRepository.findOne({
          where: { id: userId },
        });
        if (!user) {
          throw new Error(`User with ID ${userId} not found`);
        }
        newPhoto.user = user;
      }

      if (wineId) {
        const wine = await this.winesRepository.findOne({
          where: { id: wineId },
        });
        if (!wine) {
          throw new Error(`Wine with ID ${wineId} not found`);
        }
        newPhoto.wine = wine;
      }

      return await this.filesRepository.save(newPhoto);
    } catch (err) {
      console.error(`Failed to upload photo: ${err.message}`);
      throw new Error(`Failed to upload photo: ${err.message}`);
    }
  }
}
