import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class GetAllProductDto extends PaginationDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      const val = value.toLowerCase();
      if (val === 'true' || val === 'false') return val === 'true';
    }
    if (value != null) return Boolean(value);
  })
  available?: boolean;
}
