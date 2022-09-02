import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCashierDto } from './dto/create-cashier.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateCashierDto } from './dto/update-cashier.dto';

@Injectable()
export class CashiersService {
  constructor(private readonly prisma: PrismaService) {}
  async createOrder(createOrderDto: CreateOrderDto) {
    const { customerId, employeeId, orderItems } = createOrderDto;
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
      const order = await this.prisma.order.findUniqueOrThrow({
        where: { id: newOrder.id },
        select: {
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

      let total = order.orderProducts.reduce((acc, curr) => {
        return acc + parseFloat(`${curr.product.price}`);
      }, 0);
      total = parseFloat(total.toFixed(2));

      const numberOfProducts = order.orderProducts.length;

      return { total, numberOfProducts, ...order };
    } catch (error) {}
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
