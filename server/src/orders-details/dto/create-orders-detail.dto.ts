import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateOrdersDetailDto {
  @IsNumber()
  @IsPositive()
  items: number;

  @IsNumber()
  @IsPositive()
  subTotal: number;

  @IsUUID()
  product: string;
}
