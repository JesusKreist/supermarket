import { Module } from '@nestjs/common';
import { SupervisorsService } from './supervisors.service';
import { SupervisorsController } from './supervisors.controller';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  controllers: [SupervisorsController],
  providers: [SupervisorsService],
  imports: [EmployeesModule],
})
export class SupervisorsModule {}
