import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrdersDetailsService } from 'src/orders-details/orders-details.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @Inject(OrdersDetailsService)
    private readonly orderDetailsService: OrdersDetailsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { description, details } = createOrderDto;

    const order = new OrderEntity();
    order.amount = 0;
    order.description = description;

    const detailsEntities = await Promise.all(
      details.map(async (d) => {
        const detail = await this.orderDetailsService.create(d);
        order.amount += detail.subTotal;
        return detail;
      }),
    );

    order.details = detailsEntities;

    return await this.orderRepository.save(order);
  }

  /*
  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
  */
}
