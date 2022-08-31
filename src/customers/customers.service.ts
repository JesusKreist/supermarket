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

  async getOrderOfOneCustomerById(id: number) {
    const order = await this.prisma.order.findUniqueOrThrow({
      where: { id: id },
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
  }
}
