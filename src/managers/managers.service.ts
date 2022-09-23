import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from '../employees/dto/create-employee.dto';
import { EmployeesService } from '../employees/employees.service';

@Injectable()
export class ManagersService {
  constructor(private readonly employeesService: EmployeesService) {}
  createNewEmployee(createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.addNewEmployee(createEmployeeDto);
  }

  changeRoleOfEmployee(employeeId: number, newRole: 'CASHIER' | 'SUPERVISOR') {
    return this.employeesService.changeRole(employeeId, newRole);
  }

  softDeleteEmployee(employeeId: number) {
    return null;
  }

  listAllEmployees() {
    return null;
  }
  sendEmailToOneEmployee(employeeId: number, message: string) {
    return null;
  }
  sendEmailToAllEmployees(message: string) {
    return null;
  }

  giveTaskToEmployee(employeeId: number, task: string) {
    return null;
  }
}
