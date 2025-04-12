import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CredentialsAuthDto {
  @Type(() => String)
  @IsEmail()
  email: string;

  @Type(() => String)
  @IsNotEmpty()
  @Length(4, 15)
  password: string;
}
