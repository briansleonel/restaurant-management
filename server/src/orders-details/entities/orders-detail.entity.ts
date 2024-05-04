import { BaseEntity } from 'src/config/base.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'order_details' })
export class OrdersDetailEntity extends BaseEntity {
  @Column()
  items: number;

  @Column({ type: 'decimal' })
  subTotal: number;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  product: ProductEntity;

  @ManyToOne(() => OrderEntity, (order) => order.details)
  order: OrderEntity;
}
