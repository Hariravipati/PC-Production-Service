import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { AppError } from './app_error';
import { ERROR } from '../enums/global_enums';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message:string = ERROR.SOMETHING_WENT_WRONG;
    let tag: string = 'SERVER_ERROR';

    if (exception instanceof AppError) {
        console.log(' AppError details:', exception.message);
      status = exception.getStatus();
      message = exception.message;
      tag = exception.tag ?? 'SERVER_ERROR';
    } else if (exception instanceof NotFoundException) {
        console.log(' NotFoundException details:', exception.message);
      status = HttpStatus.NOT_FOUND;
      tag = 'NOT_FOUND';
      message = 'Resource not found';
    } else if (exception instanceof Error && exception.name === 'ValidationError') {
      console.log('ValidationError details:', exception.message);
      status = HttpStatus.BAD_REQUEST;
      const res = exception.message;
        message = res;
       tag = 'BAD_REQUEST';}
        
    else if (exception instanceof HttpException) {
        console.log(' HttpException details:', exception.message);
        status = exception.getStatus();

      // Extract detailed error message(s) from getResponse()
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        // ValidationPipe typically sends { message: string[] | string, error: string, statusCode: number }
        if (Array.isArray(res['message'])) {
          message = res['message'].join(', ');
        } else if (typeof res['message'] === 'string') {
          message = res['message'];
        } else {
          message = exception.message || ERROR.SOMETHING_WENT_WRONG;
        }
      } else {
        message = exception.message || ERROR.SOMETHING_WENT_WRONG;
      }

      tag = 'HTTP_EXCEPTION';
    }

    response.status(status).json({
      status,
      success: false,
      tag,
      msg: message,
      data: null,
    });
  }
}
