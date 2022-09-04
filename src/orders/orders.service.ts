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
  }

  async getTotalPriceOfAnOrder(
    orderProducts: {
      product: {
        itemName: string;
        category: string;
        price: Decimal;
      };
    }[],
  ) {
    const total = orderProducts.reduce((acc, curr) => {
      return acc + parseFloat(`${curr.product.price}`);
    }, 0);

    return parseFloat(total.toFixed(2));
  }
  async createOrder(createOrderDto: CreateOrderDto) {
    const { customerId, employeeId, orderItems } = createOrderDto;
    console.dir(createOrderDto);
    const newOrder = await this.prisma.order.create({
      data: {
        customerId,
        employeeId,
      },
    });

    orderItems.forEach(async (productId) => {
      await this.prisma.orderProduct.create({
        data: {
          orderId: newOrder.id,
          productId: productId,
        },
      });
    });

    try {
      const order = await this.retrieveOrderFromDatabase(newOrder.id);
      const total = await this.getTotalPriceOfAnOrder(order.orderProducts);
      const numberOfProducts = orderItems.length;

      return { total, numberOfProducts, ...order };
    } catch (error) {}
  }

  async getDetailsOfAnOrder(orderId: number) {
    console.log('The order id is :>> ', orderId);
    try {
      const order = await this.retrieveOrderFromDatabase(orderId);

      let total = order.orderProducts.reduce((acc, curr) => {
        return acc + parseFloat(`${curr.product.price}`);
      }, 0);
      total = parseFloat(total.toFixed(2));

      const numberOfProducts = order.orderProducts.length;

      return { total, numberOfProducts, ...order };
    } catch (error) {
      throw new NotFoundException('Order does not exist!');
    }
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
