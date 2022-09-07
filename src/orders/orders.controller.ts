import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':orderId')
  getDetailsOfAnOrder(@Param('orderId') orderId: string) {
    // TODO implement auth with customerId
    return this.ordersService.getDetailsOfAnOrder(+orderId);
  }
}
