export class ResponseDto<T> {
  success: boolean;
  status: number;
  message: string;
  data?: T;
  timestamp: string;

  constructor(success: boolean, status: number, message: string, data?: T) {
    this.success = success;
    this.status = status;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(data: T, message = 'Success'): ResponseDto<T> {
    return new ResponseDto(true, 200, message, data);
  }

  static error(status: number, message: string): ResponseDto<null> {
    return new ResponseDto(false, status, message, null);
  }
}
