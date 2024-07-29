import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  uploadFile(file: Express.Multer.File, body: any) {
    // Aquí puedes manejar los datos adicionales (body) y la URL de la imagen
    const { name, age } = body;
    const imageUrl = `http://localhost:3000/uploads/${file.filename}`;

    // Ejemplo de respuesta con los datos y la URL de la imagen
    return {
      name,
      age,
      imageUrl,
    };
  }
}
