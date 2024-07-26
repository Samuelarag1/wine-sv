import { DeleteResult } from 'typeorm';
import { IMUser } from './../models/User';
import { UserService } from './User.services';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserDTO } from './dto/User.dto';

//! Exceptions
import { HttpNotFound } from 'src/HttpExceptions/Exceptions';
import { HttpBadRequest } from 'src/HttpExceptions/Exceptions';
import { Wine } from 'src/database/entity/Wine.entity';

//?
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import multerOptions from './../config/multer.config';

@Controller('users')
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(
    @Body() createUser: UserDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const baseUrl = `${process.env.BASE_URL || 'http://localhost:3000'}`; // Asegúrate de definir BASE_URL en tus variables de entorno
      const imageUrl = `${baseUrl}/upload/${file.filename}`;
      createUser = { ...createUser, image: imageUrl };
    }

    const user = await this.userServices.create(createUser);

    if (!user) {
      throw new HttpBadRequest('Error al crear el usuario');
    }

    return user;
  }

  @Get()
  async findAllUsers(): Promise<IMUser[]> {
    const users = await this.userServices.findAll();

    if (!users) {
      throw new HttpBadRequest('Todavia no hay usuarios cargados');
    }
    return users;
  }

  @Get(':id')
  async findOneUser(@Param('id') id: number): Promise<IMUser> {
    const user = await this.userServices.findOne(id);
    if (!user) {
      throw new HttpBadRequest('No existe en la base de datos');
    }
    return user;
  }

  @Post('/email')
  async findUserByEmail(@Body('email') email: string): Promise<IMUser> {
    const user = await this.userServices.findByEmail(email);
    if (!user) {
      throw new HttpBadRequest('No existe en la base de datos');
    }
    return user;
  }

  @Delete(':id')
  async removeUser(@Param('id') id: number): Promise<DeleteResult> {
    const deleted = await this.userServices.removeUser(id);
    if (!deleted) {
      throw new HttpBadRequest('No existe el usuario a eliminar');
    }
    return deleted;
  }

  @Get('/wines/:id')
  async getUserWines(@Param('id') id: number): Promise<Wine[]> {
    const wines = await this.userServices.findUserWines(id);

    if (wines.length === 0) {
      throw new HttpNotFound('No existen vinos para este usuario');
    }
    return wines;
  }
}
