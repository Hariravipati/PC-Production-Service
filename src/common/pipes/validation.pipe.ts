import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from '../exceptions/business.exceptions';

export class GlobalValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map(error => 
          Object.values(error.constraints || {}).join(', ')
        ).join('; ');
        return new ValidationException(messages);
      },
    });
  }
}