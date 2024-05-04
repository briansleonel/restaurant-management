import { IsString, MinLength } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(20)
  description: string;
}
