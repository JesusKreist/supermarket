import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UpdateCashierDto } from './dto/update-cashier.dto';

@Injectable()
export class CashiersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return `This action returns all cashiers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cashier`;
  }

  update(id: number, updateCashierDto: UpdateCashierDto) {
    return `This action updates a #${id} cashier`;
  }

  remove(id: number) {
    return `This action removes a #${id} cashier`;
  }
}
