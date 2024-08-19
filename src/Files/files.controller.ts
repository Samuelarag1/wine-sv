import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('upload')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  filesFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.filesService.uploadFile(file, body);
  }
}
