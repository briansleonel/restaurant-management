import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { OrdersDetailsModule } from './orders-details/orders-details.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DataSourceConfig),
    RestaurantsModule,
    ProductsModule,
    OrdersModule,
    OrdersDetailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
