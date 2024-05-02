import { BaseEntity } from 'src/config/base.entity';
import { RestaurantEntity } from 'src/restaurants/entities/restaurant.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.id)
  restaurant: RestaurantEntity;
}
