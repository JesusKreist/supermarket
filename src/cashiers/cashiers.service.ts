import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CustomersService } from '../customers/customers.service';
import { CreateCustomerDto } from '../customers/dto/create-customer.dto';
import {
  CustomerOrderDto,
  GuestOrderDto,
} from '../orders/dto/create-order.dto';
import { OrdersService } from '../orders/orders.service';
import { GuestToCustomerOrderDto } from './dto/guest-to-customer.dto';
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
    const isEmailInDatabase = await this.customersService.isEmailInDatabase(
      createCustomerDto.emailAddress,
    );
    if (isEmailInDatabase) {
      throw new ConflictException('Email already exists.');
    }

    return this.customersService.create(createCustomerDto);
  }

  async transferGuestOrdersToCustomer(
    guestToCustomerOrderDto: GuestToCustomerOrderDto,
  ) {
    const { customerId, ordersToTransfer } = guestToCustomerOrderDto;
    await this.customersService.findOne(customerId);

    const mappedOrders = ordersToTransfer.map((orderId) =>
      this.ordersService.getDetailsWithCustomerInfoOfAnOrder(orderId),
    );
    const orders = await Promise.all(mappedOrders);
    const allCustomersInOrders = orders.map((order) => order.customer);
    const areAllOrdersByGuests = allCustomersInOrders.every(
      (customer) => customer === null,
    );

    if (!areAllOrdersByGuests) {
      throw new ConflictException('One or more orders are not guest orders.');
    }

    const batchUpdateOrders = orders.map((order) => {
      return this.ordersService.updateCustomerOnOrder(order.id, customerId);
    });
    const updatedOrders = await Promise.all(batchUpdateOrders);

    return updatedOrders;
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
