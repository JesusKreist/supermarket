type productId = number;

export class CreateOrderDto {
  customerId: number;
  employeeId: number;
  orderItems: productId[];
}
