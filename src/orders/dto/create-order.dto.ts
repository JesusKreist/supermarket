import { IsNotEmpty, IsNumber } from 'class-validator';

type productId = number;

export class GuestOrderDto {
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  orderItems: productId[];
}

export class CreateOrderDto extends GuestOrderDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number;
}
