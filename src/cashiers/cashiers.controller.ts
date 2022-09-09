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
import {
  CustomerOrderDto,
  GuestOrderDto,
} from '../orders/dto/create-order.dto';
import { CashiersService } from './cashiers.service';
import { UpdateCashierDto } from './dto/update-cashier.dto';

@Controller('cashiers')
export class CashiersController {
  constructor(private readonly cashiersService: CashiersService) {}

  @Post('new-order')
  newCustomerOrder(@Body() customerOrderDto: CustomerOrderDto) {
    return this.cashiersService.createCustomerOrder(customerOrderDto);
  }

  @Post('guest-checkout')
  newGuestOrder(@Body() guestOrderDto: GuestOrderDto) {
    return this.cashiersService.createGuestOrder(guestOrderDto);
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
