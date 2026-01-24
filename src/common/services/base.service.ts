import { Logger } from '@nestjs/common';
import { BusinessException, NotFoundException } from '../exceptions/business.exceptions';

export abstract class BaseService {
  protected readonly logger = new Logger(this.constructor.name);

  protected validateUserId(userId: number): void {
    if (!userId || userId <= 0) {
      throw new BusinessException('Invalid user ID');
    }
  }

  protected throwNotFound(resource: string): never {
    throw new NotFoundException(resource);
  }

  protected throwBusinessError(message: string): never {
    throw new BusinessException(message);
  }
}