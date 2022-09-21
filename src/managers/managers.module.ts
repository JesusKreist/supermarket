import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  controllers: [ManagersController],
  providers: [ManagersService],
  imports: [EmployeesModule],
})
export class ManagersModule {}
