import { IsNotEmpty } from 'class-validator';

type productId = number;

class OrderDto {
  @IsNotEmpty()
  employeeId: number;

  @IsNotEmpty()
  orderItems: productId[];
}

export class CreateOrderDto extends OrderDto {
  @IsNotEmpty()
  customerId: number;
}

export class GuestOrderDto extends OrderDto {
  customerId?: number;
}
