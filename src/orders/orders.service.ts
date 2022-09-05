import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async retrieveOrderFromDatabase(orderId: number) {
    try {
      return await this.prisma.order.findUniqueOrThrow({
        where: { id: orderId },
        select: {
          id: true,
          createdAt: true,
          employee: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          orderProducts: {
            select: {
              product: {
                select: {
                  itemName: true,
                  category: true,
                  price: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException('Order does not exist.');
    }
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const { customerId, employeeId, orderItems } = createOrderDto;

    // Create the order so the id can be used to create order products
    const newOrder = await this.prisma.order.create({
      data: {
        customerId,
        employeeId,
      },
    });

    // batch insert order items
    await this.prisma.orderProduct.createMany({
      data: orderItems.map((productId) => ({
        orderId: newOrder.id,
        productId: productId,
      })),
    });

    return this.getDetailsOfAnOrder(newOrder.id);
  }

  async getDetailsOfAnOrder(orderId: number) {
    console.log('The order id is :>> ', orderId);

    const order = await this.retrieveOrderFromDatabase(orderId);

    let total = order.orderProducts.reduce((acc, curr) => {
      return acc + parseFloat(`${curr.product.price}`);
    }, 0);
    total = parseFloat(total.toFixed(2));

    const numberOfProducts = order.orderProducts.length;

    return { total, numberOfProducts, ...order };
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
