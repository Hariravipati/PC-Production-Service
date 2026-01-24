import { HttpException } from '@nestjs/common';
import { FAILURE } from '../enums/global_enums';

export class AppError extends HttpException {
  tag?: string;

  constructor(message: string, statusCode: number, tag?: string) {
    super(message, statusCode);
    this.tag = tag || FAILURE.FAILED;
  }
}
