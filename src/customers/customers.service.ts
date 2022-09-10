import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async isEmailInDatabase(emailAddress: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { emailAddress },
    });

    if (customer) {
      return true;
    }

    return false;
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
