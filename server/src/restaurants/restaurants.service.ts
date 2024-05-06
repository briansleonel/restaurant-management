import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantEntity } from './entities/restaurant.entity';
import { ProductsService } from 'src/products/products.service';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepository: Repository<RestaurantEntity>,
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    try {
      const restaurant =
        await this.restaurantRepository.save(createRestaurantDto);

      if (!restaurant)
        throw new BadRequestException('Restaurant: could not be saved');

      return restaurant;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllPagination(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const restaurants = await this.restaurantRepository.find({
      skip,
      take: limit,
      order: { createdAt: { direction: 'ASC' } },
    });

    const hasMore = restaurants.length === limit;
    return { restaurants, hasMore };
  }

  async findAll() {
    return await this.restaurantRepository.find({
      order: { createdAt: { direction: 'ASC' } },
    });
  }

  async findProductsByRestaurant(id: string) {
    return await this.productsService.findAllByRestaurant(id);
  }

  async findOrdersByRestaurant(id: string) {
    return await this.ordersService.findAllByRestaurant(id);
  }

  async findOne(id: string) {
    try {
      const restaurant = await this.restaurantRepository.findOneBy({ id });

      if (!restaurant) throw new BadRequestException('Restaurant: not found');

      return restaurant;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    try {
      const res = await this.restaurantRepository.update(
        id,
        updateRestaurantDto,
      );

      if (res.affected === 0)
        throw new BadRequestException('Restaurant: could not be updated');

      return res;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const res = await this.restaurantRepository.softDelete({ id });

      if (res.affected === 0)
        throw new BadRequestException('Restaurant: could not be deleted');

      return res;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
