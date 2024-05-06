import { BaseEntity } from 'src/config/base.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'restaurants' })
export class RestaurantEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @OneToMany(() => ProductEntity, (product) => product.restaurant)
  products: Array<ProductEntity>;

  @OneToMany(() => OrderEntity, (order) => order.restaurant)
  orders: Array<OrderEntity>;
}
