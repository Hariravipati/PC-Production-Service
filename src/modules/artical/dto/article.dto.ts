import { IsString, IsOptional, IsNumber, IsBoolean, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateArticleDto {
  @IsNumber()
  articleNo: number;

  @IsString()
  articleName: string;

  @IsOptional()
  @IsString()
  articleHsnCode?: string;

  @IsOptional()
  @IsString()
  articleUnit?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  articleGstPercent?: number;

  @IsOptional()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  articleDate?: Date;

  @IsOptional()
  @IsNumber()
  @Min(0)
  articleRate?: number;

  @IsOptional()
  @IsBoolean()
  isIdSelected?: boolean;
}

export class UpdateArticleDto {
  @IsOptional()
  @IsString()
  articleName?: string;

  @IsOptional()
  @IsString()
  articleHsnCode?: string;

  @IsOptional()
  @IsString()
  articleUnit?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  articleGstPercent?: number;

  @IsOptional()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  articleDate?: Date;

  @IsOptional()
  @IsNumber()
  @Min(0)
  articleRate?: number;

  @IsOptional()
  @IsBoolean()
  isIdSelected?: boolean;
}