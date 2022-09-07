import { Module } from '@nestjs/common';
import { CashiersService } from './cashiers.service';
import { CashiersController } from './cashiers.controller';
import { OrdersModule } from '../orders/orders.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  controllers: [CashiersController],
  providers: [CashiersService],
  imports: [OrdersModule, CustomersModule],
})
export class CashiersModule {}
