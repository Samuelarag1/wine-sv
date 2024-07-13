import { UserDTO } from './dto/User.dto';
import { Wine } from './../database/entity/Wine.entity';
import { IMUser } from './../models/User';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './../database/entity/User.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Wine) private wineRepository: Repository<Wine>,
  ) {}

  async create(body: UserDTO) {
    const userCreated = this.userRepository.create(body);
    return this.userRepository.save(userCreated);
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
