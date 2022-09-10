import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CustomersService } from '../customers/customers.service';
import { CreateCustomerDto } from '../customers/dto/create-customer.dto';
import {
  CustomerOrderDto,
  GuestOrderDto,
} from '../orders/dto/create-order.dto';
import { OrdersService } from '../orders/orders.service';
import { UpdateCashierDto } from './dto/update-cashier.dto';

@Injectable()
export class CashiersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ordersService: OrdersService,
    private readonly customersService: CustomersService,
  ) {}

  async createCustomerOrder(createOrderDto: CustomerOrderDto) {
    await this.customersService.findOne(createOrderDto.customerId);
    return this.ordersService.createOrder(createOrderDto);
  }

  createGuestOrder(guestOrderDto: GuestOrderDto) {
    return this.ordersService.createOrder(guestOrderDto);
  }

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    await this.customersService.findOneByEmail(createCustomerDto.emailAddress);
    return this.customersService.create(createCustomerDto);
  }

  findAll() {
    return `This action returns all cashiers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cashier`;
  }

  update(id: number, updateCashierDto: UpdateCashierDto) {
    return `This action updates a #${id} cashier`;
  }

  remove(id: number) {
    return `This action removes a #${id} cashier`;
  }
}
