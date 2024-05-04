import { Controller } from '@nestjs/common';

@Controller('orders-details')
export class OrdersDetailsController {
  /*
  constructor(private readonly ordersDetailsService: OrdersDetailsService) {}

  @Post()
  create(@Body() createOrdersDetailDto: CreateOrdersDetailDto) {
    return this.ordersDetailsService.create(createOrdersDetailDto);
  }
  
  @Get()
  findAll() {
    return this.ordersDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdersDetailDto: UpdateOrdersDetailDto) {
    return this.ordersDetailsService.update(+id, updateOrdersDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersDetailsService.remove(+id);
  }
  */
}
