import { BaseEntity } from 'src/config/base.entity';
import { OrdersDetailEntity } from 'src/orders-details/entities/orders-detail.entity';
import { RestaurantEntity } from 'src/restaurants/entities/restaurant.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  image: string;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.id)
  restaurant: RestaurantEntity;

  @OneToMany(() => OrdersDetailEntity, (detail) => detail.product)
  orderDetails: Array<OrdersDetailEntity>;
}
