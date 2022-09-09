import { PartialType } from '@nestjs/swagger';
import { CustomerOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CustomerOrderDto) {}
