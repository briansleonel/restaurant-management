import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { RestaurantEntity } from 'src/restaurants/entities/restaurant.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @Inject(forwardRef(() => RestaurantsService))
    private readonly restaurantsService: RestaurantsService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const restaurant = await this.restaurantsService.findOne(
        createProductDto.restaurant,
      );

      const product = await this.productRepository.save({
        ...createProductDto,
        restaurant,
      });

      if (!product)
        throw new BadRequestException('Product: could not be saved');

      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return this.productRepository.find({ relations: ['restaurant'] });
  }

  async findAllByRestaurant(id: string) {
    try {
      return await this.productRepository.find({
        where: { restaurant: { id } },
        relations: ['restaurant'],
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productRepository.findOneBy({ id });

      if (!product) throw new BadRequestException('Product: not found');

      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      let restaurant: RestaurantEntity;
      if (updateProductDto.restaurant) {
        restaurant = await this.restaurantsService.findOne(
          updateProductDto.restaurant,
        );
      }

      const res = await this.productRepository.update(id, {
        ...updateProductDto,
        restaurant,
      });

      if (res.affected === 0)
        throw new BadRequestException('Product: could not be updated');

      return res;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const res = await this.productRepository.softDelete({ id });

      if (res.affected === 0)
        throw new BadRequestException('Product: could not be deleted');

      return res;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
