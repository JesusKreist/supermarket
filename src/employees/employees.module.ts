import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [PrismaModule],
})
export class EmployeesModule {}
