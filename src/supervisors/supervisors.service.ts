import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { EmployeesService } from '../employees/employees.service';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';

@Injectable()
export class SupervisorsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly employeesService: EmployeesService,
  ) {}

  async showAllCashiersOnShift(isOnShift: boolean) {
    return this.employeesService.viewAllEmployees('CASHIER', isOnShift);
  }

  async showAllCashiers(isOnShift?: boolean) {
    if (isOnShift) return this.showAllCashiersOnShift(true);

    return this.employeesService.viewAllEmployees('CASHIER');
  }
  async changeCashierShiftStatus(cashierId: number, isOnShift: boolean) {
    return this.employeesService.updateDetails(cashierId, {
      isCurrentlyOnShift: isOnShift,
    });
  }
  async sendEmailToAllCashiers(message: string) {
    return null;
  }
  async sendEmailToOneCashier(cashierId: number, message: string) {
    return null;
  }
}
