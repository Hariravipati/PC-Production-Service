import { Logger } from '@nestjs/common';
import { ResponseDto } from '../dto/response_dto';

export abstract class BaseController {
  protected readonly logger = new Logger(this.constructor.name);

  protected logUserAction(userId: number, action: string, resource?: string): void {
    const message = resource 
      ? `User ${userId} ${action} ${resource}`
      : `User ${userId} ${action}`;
    this.logger.log(message);
  }

  protected success<T>(data: T, message?: string): ResponseDto<T> {
    return ResponseDto.success(data, message);
  }

  protected error(status: number, message: string): ResponseDto<null> {
    return ResponseDto.error(status, message);
  }
}