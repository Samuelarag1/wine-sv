import { IMUser } from './../models/User';
import { UserService } from './User.services';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDTO } from './dto/User.dto';

@Controller()
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Post('users')
  async create(@Body() createUser: UserDTO) {
    this.userServices.create(createUser);
    console.log(JSON.stringify(createUser));
  }

  @Get('users')
  async findAllUsers(): Promise<IMUser[]> {
    return this.userServices.findAll();
  }
}
