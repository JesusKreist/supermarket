import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCustomerDto } from '../customers/dto/create-customer.dto';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { CashiersService } from './cashiers.service';
import { UpdateCashierDto } from './dto/update-cashier.dto';

@Controller('cashiers')
export class CashiersController {
  constructor(private readonly cashiersService: CashiersService) {}

  @Post('new-order')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.cashiersService.createOrder(createOrderDto);
  }

  @Post('new-customer')
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.cashiersService.createCustomer(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.cashiersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashiersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashierDto: UpdateCashierDto) {
    return this.cashiersService.update(+id, updateCashierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashiersService.remove(+id);
  }
}
