import { PartialType } from '@nestjs/swagger';
import { BaseProductDetailDto } from './base-product-detail.dto';
import { IsOptional } from 'class-validator';

export class UpdateProductDetailDto extends PartialType(BaseProductDetailDto) {
  @IsOptional()
  imageUrl?: string;

  @IsOptional()
  imageAlt?: string;

  @IsOptional()
  imageUrl2?: string;

  @IsOptional()
  imageAlt2?: string;

  @IsOptional()
  imageUrl3?: string;

  @IsOptional()
  imageAlt3?: string;

  @IsOptional()
  detail?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  ingredients?: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  price?: string;

  @IsOptional()
  isHidden?: boolean;
}
