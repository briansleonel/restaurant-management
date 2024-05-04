import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrdersDetailsModule } from 'src/orders-details/orders-details.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), OrdersDetailsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
