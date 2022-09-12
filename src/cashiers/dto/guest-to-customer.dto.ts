import { IsNotEmpty, IsNumber } from 'class-validator';

export class GuestToCustomerOrderDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  ordersToTransfer: number[];
}
