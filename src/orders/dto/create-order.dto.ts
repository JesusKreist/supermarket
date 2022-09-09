import { IsNotEmpty, IsNumber } from 'class-validator';

type productId = number;

export class OrderDto {
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  orderItems: productId[];
}

export class CustomerOrderDto extends OrderDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number;
}

export class GuestOrderDto extends OrderDto {}
