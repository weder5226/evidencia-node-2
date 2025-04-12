import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  name?: string;

  @IsOptional()
  quantityStock?: number;
}
