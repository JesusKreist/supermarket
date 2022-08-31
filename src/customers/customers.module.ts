import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [PrismaModule],
})
export class CustomersModule {}
