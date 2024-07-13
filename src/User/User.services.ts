import { IMUser } from './../models/User';
import { Repository } from 'typeorm';
import { User } from './../database/entity/User.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(body: IMUser) {
    return this.userRepository.save(body);
  }
  async findAll(): Promise<IMUser[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async removeUser(id: number): Promise<void> {
    this.userRepository.delete(id);
  }
}
