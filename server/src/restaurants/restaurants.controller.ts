import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return await this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  async findAllPagination(@Query('page', ParseIntPipe) page?: number) {
    if (!page || page === 0) {
      page = 1; // Establecer la página 1 como valor predeterminado
    }

    return await this.restaurantsService.findAllPagination(page);
  }

  @Get('/all')
  async findAll() {
    return await this.restaurantsService.findAll();
  }

  @Get('/:id/products')
  async findProductsByRestaurant(
    @Param('id') id: string,
    @Query('page', ParseIntPipe) page?: number,
  ) {
    if (!page || page === 0) {
      page = 1; // Establecer la página 1 como valor predeterminado
    }
    return await this.restaurantsService.findProductsByRestaurant(id);
  }

  @Get('/:id/orders')
  async findOrdersByRestaurant(@Param('id') id: string) {
    return await this.restaurantsService.findOrdersByRestaurant(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.restaurantsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return await this.restaurantsService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.restaurantsService.remove(id);
  }
}
