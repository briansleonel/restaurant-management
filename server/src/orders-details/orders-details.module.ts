import { Module } from '@nestjs/common';
import { OrdersDetailsService } from './orders-details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersDetailEntity } from './entities/orders-detail.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersDetailEntity]), ProductsModule],
  //controllers: [OrdersDetailsController],
  providers: [OrdersDetailsService],
  exports: [OrdersDetailsService],
})
export class OrdersDetailsModule {}
