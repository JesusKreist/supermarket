import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from '../employees/dto/create-employee.dto';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Injectable()
export class ManagersService {
  createNewEmployee(createEmployeeDto: CreateEmployeeDto) {
    return null;
  }
  changeRoleOfEmployee(employeeId: number, newRole: 'CASHIER' | 'SUPERVISOR') {
    return null;
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
