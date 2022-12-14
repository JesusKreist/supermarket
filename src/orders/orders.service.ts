import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CustomerOrderDto, GuestOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}
  protected async retrieveOrderWithCustomerInfo(orderId: number) {
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
          customer: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException('Order does not exist.');
    }
  }

  protected async retrieveOrderWithoutCustomerInfo(orderId: number) {
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

  async createOrder(createOrderDto: CustomerOrderDto | GuestOrderDto) {
    const { employeeId, orderItems } = createOrderDto;

    const customerId =
      createOrderDto instanceof GuestOrderDto
        ? undefined
        : createOrderDto.customerId;

    // TODO: add a check to see if the customer is stored in the database
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
    const order = await this.retrieveOrderWithoutCustomerInfo(orderId);

    let total = order.orderProducts.reduce((acc, curr) => {
      return acc + parseFloat(`${curr.product.price}`);
    }, 0);
    total = parseFloat(total.toFixed(2));

    const numberOfProducts = order.orderProducts.length;

    return { total, numberOfProducts, ...order };
  }

  async getDetailsWithCustomerInfoOfAnOrder(orderId: number) {
    const order = await this.retrieveOrderWithCustomerInfo(orderId);

    let total = order.orderProducts.reduce((acc, curr) => {
      return acc + parseFloat(`${curr.product.price}`);
    }, 0);
    total = parseFloat(total.toFixed(2));

    const numberOfProducts = order.orderProducts.length;

    return { total, numberOfProducts, ...order };
  }

  async updateCustomerOnOrder(orderId: number, customerId: number) {
    const order = await this.retrieveOrderWithCustomerInfo(orderId);

    const isOrderAlreadyAssociatedWithCustomer = order.customer !== null;
    if (isOrderAlreadyAssociatedWithCustomer) {
      throw new BadRequestException(
        'Order is already associated with a customer.',
      );
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        customerId,
      },
    });

    return updatedOrder;
  }
}
