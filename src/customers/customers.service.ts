import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}
  create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: createCustomerDto,
    });
  }

  findAll() {
    return this.prisma.customer.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.prisma.customer.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      // TODO: handle error by logging it
      throw new NotFoundException('Customer not found.');
    }
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return await this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  remove(id: number) {
    return this.prisma.customer.delete({ where: { id } });
  }

  async getDetailsOfAnOrder(orderId: number) {
    try {
      const order = await this.prisma.order.findUniqueOrThrow({
        where: { id: orderId },
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

  async getAllOrders(customerId: number) {
    console.log('customer id is :>>', customerId);

    const orders = await this.prisma.order.findMany({
      where: { customerId: customerId },
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

    return orders;
  }

  async getRewardsPoints(customerId: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
      select: {
        rewardsPoints: true,
      },
    });

    return customer.rewardsPoints;
  }
}
