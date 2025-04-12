import { Type } from 'class-transformer';
import { IsInt, Length, Max, Min } from 'class-validator';
import { IsTrimmed } from 'src/common/validation/isTrimmed';

export class CreateProductDto {
  @Type(() => String)
  @IsTrimmed()
  @Length(3, 45)
  name: string;

  @Type(() => Number)
  @IsInt()
  @Max(5000)
  @Min(0)
  quantityStock: number;
}
