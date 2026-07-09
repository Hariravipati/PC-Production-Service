import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class InvoiceQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  per_page?: number;

  @IsOptional()
  @IsString()
  date_start?: string;

  @IsOptional()
  @IsString()
  date_end?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
