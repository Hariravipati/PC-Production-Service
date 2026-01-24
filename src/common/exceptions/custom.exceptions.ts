import { HttpException, HttpStatus } from '@nestjs/common';

export class OtpException extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(
      {
        success: false,
        status,
        error: 'OTP Error',
        message,
      },
      status,
    );
  }
}

export class ValidationException extends HttpException {
  constructor(message: string) {
    super(
      {
        success: false,
        status: HttpStatus.BAD_REQUEST,
        error: 'Validation Error',
        message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class RateLimitException extends HttpException {
  constructor(message: string = 'Too many requests') {
    super(
      {
        success: false,
        status: HttpStatus.TOO_MANY_REQUESTS,
        error: 'Rate Limit Exceeded',
        message,
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}