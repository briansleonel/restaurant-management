import {
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsUUID()
  restaurant: string;
}
