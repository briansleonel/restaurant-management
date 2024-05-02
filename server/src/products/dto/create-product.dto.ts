import {
  IsDecimal,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsDecimal()
  @IsPositive()
  price: number;

  @IsUUID()
  restaurant: string;
}
