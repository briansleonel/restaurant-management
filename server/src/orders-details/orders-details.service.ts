import { Inject, Injectable } from '@nestjs/common';
import { CreateOrdersDetailDto } from './dto/create-orders-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersDetailEntity } from './entities/orders-detail.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersDetailsService {
  constructor(
    @InjectRepository(OrdersDetailEntity)
    private readonly orderDetailsRepository: Repository<OrdersDetailEntity>,
    @Inject(ProductsService)
    private readonly productService: ProductsService,
  ) {}

  async create(createOrdersDetailDto: CreateOrdersDetailDto) {
    const { items, product } = createOrdersDetailDto;

    const detailEntity = new OrdersDetailEntity();

    detailEntity.product = await this.productService.findOne(product);
    detailEntity.items = items;
    detailEntity.subTotal = detailEntity.product.price * items;

    return await this.orderDetailsRepository.save(detailEntity);
  }

  /*
  findAll() {
    return `This action returns all ordersDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordersDetail`;
  }

  update(id: number, updateOrdersDetailDto: UpdateOrdersDetailDto) {
    return `This action updates a #${id} ordersDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordersDetail`;
  }
  */
}
