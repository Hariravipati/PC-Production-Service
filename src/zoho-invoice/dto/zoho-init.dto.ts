import { IsString, IsNotEmpty } from 'class-validator';

export class ZohoInitDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
