import { Type } from 'class-transformer';
import { IsBoolean, IsUrl, Length } from 'class-validator';
import { IsDecimalString } from 'src/common/validation/isDecimalString';
import { IsTrimmed } from 'src/common/validation/isTrimmed';
import { MinNumString } from 'src/common/validation/minNumString';

export class BaseProductDetailDto {
  @Type(() => String)
  @IsUrl()
  @Length(10, 480)
  imageUrl: string;

  @Type(() => String)
  @IsTrimmed()
  @Length(5, 90)
  imageAlt: string;

  @Type(() => String)
  @IsUrl()
  @Length(10, 480)
  imageUrl2: string;

  @Type(() => String)
  @IsTrimmed()
  @Length(5, 90)
  imageAlt2: string;

  @Type(() => String)
  @IsUrl()
  @Length(10, 480)
  imageUrl3: string;

  @Type(() => String)
  @IsTrimmed()
  @Length(5, 90)
  imageAlt3: string;

  @Type(() => String)
  @IsTrimmed()
  @Length(5, 240)
  detail: string;

  @Type(() => String)
  @IsTrimmed()
  @Length(15, 680)
  description: string;

  @Type(() => String)
  @IsTrimmed()
  @Length(7, 190)
  ingredients: string;

  @Type(() => String)
  @IsTrimmed()
  @Length(3, 70)
  category: string;

  @Type(() => String)
  @IsDecimalString(10, 2)
  @MinNumString(0)
  @Length(1, 15)
  price: string;

  @IsBoolean()
  isHidden: boolean;
}
