import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadPhoto(
    @UploadedFile() file,
    @Body('userId') userId?: number,
    @Body('wineId') wineId?: number,
  ) {
    return this.filesService.uploadPhoto(file, userId, wineId);
  }
}
