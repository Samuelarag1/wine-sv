import { promises as fsPromises, existsSync, mkdirSync } from 'fs';
import { UserDTO } from './dto/User.dto';
import { Wine } from './../database/entity/Wine.entity';
import { IMUser } from './../models/User';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './../database/entity/User.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Wine) private wineRepository: Repository<Wine>,
  ) {}

  async create(
    createUserDto: UserDTO,
    image: Express.Multer.File,
  ): Promise<IMUser> {
    if (!image || !image.buffer) {
      console.log('Cannot upload the image');
      throw new HttpException('Image upload failed', HttpStatus.BAD_REQUEST);
    }

    const uploadDir = join(__dirname, '../../uploads');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = join(uploadDir, image.originalname);

    try {
      await fsPromises.writeFile(filePath, image.buffer);
    } catch (error) {
      console.log('Error writing file:', error);
      throw new HttpException(
        'Error writing file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const user = new User();
    user.name = createUserDto.name;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.image = `/uploads/${image.originalname}`;

    console.log('User Created:', user);

    return this.userRepository.save(user);
  }

  async findAll(): Promise<IMUser[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async removeUser(id: number): Promise<DeleteResult> {
    this.wineRepository.update({ userId: id }, { userId: null });
    return this.userRepository.delete(id);
  }

  async findUserWines(id: number): Promise<Wine[]> {
    return await this.wineRepository.find({ where: { userId: id } });
  }
}
