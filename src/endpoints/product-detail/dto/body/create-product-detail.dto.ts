import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';
import { BaseProductDetailDto } from './base-product-detail.dto';

export class CreateProductDetailDto extends BaseProductDetailDto {
  @Type(() => Number)
  @Max(2147483647)
  @Min(1)
  @IsInt()
  productId: number;
}
