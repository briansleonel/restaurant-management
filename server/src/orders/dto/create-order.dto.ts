import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { CreateOrdersDetailDto } from 'src/orders-details/dto/create-orders-detail.dto';

export class CreateOrderDto {
  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsArray()
  @ArrayMinSize(1)
  details: Array<CreateOrdersDetailDto>;

  @IsUUID()
  restaurant: string;
}
