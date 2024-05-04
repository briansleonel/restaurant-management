import { BaseEntity } from 'src/config/base.entity';
import { OrdersDetailEntity } from 'src/orders-details/entities/orders-detail.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity {
  @Column()
  description: string;

  @Column({ default: new Date() })
  orderDate: Date;

  @Column({ type: 'decimal' })
  amount: number;

  @OneToMany(() => OrdersDetailEntity, (detail) => detail.order, {
    cascade: true,
  })
  details: Array<OrdersDetailEntity>;
}
