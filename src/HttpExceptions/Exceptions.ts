import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpBadRequest extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class HttpNotFound extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
