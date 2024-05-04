import { BaseEntity } from 'src/config/base.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'restaurants' })
export class RestaurantEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => ProductEntity, (product) => product.restaurant)
  products: Array<ProductEntity>;
}
