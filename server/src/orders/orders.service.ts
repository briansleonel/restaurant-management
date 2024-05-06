import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrdersDetailsService } from 'src/orders-details/orders-details.service';
import { Repository } from 'typeorm';
import { RestaurantsService } from 'src/restaurants/restaurants.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @Inject(OrdersDetailsService)
    private readonly orderDetailsService: OrdersDetailsService,
    @Inject(forwardRef(() => RestaurantsService))
    private readonly restaurantsService: RestaurantsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { description, details, restaurant } = createOrderDto;

    try {
      const order = new OrderEntity();
      order.amount = 0;
      order.description = description;
      order.restaurant = await this.restaurantsService.findOne(restaurant);

      const detailsEntities = await Promise.all(
        details.map(async (d) => {
          const detail = await this.orderDetailsService.create(d);
          order.amount += detail.subTotal;
          return detail;
        }),
      );

      order.details = detailsEntities;

      return await this.orderRepository.save(order);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllByRestaurant(id: string) {
    try {
      return await this.orderRepository.find({
        where: { restaurant: { id } },
        relations: { details: { product: true } },
        order: { orderDate: { direction: 'DESC' } },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
