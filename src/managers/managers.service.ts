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
    return this.employeesService.softDeleteEmployee(employeeId);
  }

  listAllEmployees(role?: 'CASHIER' | 'SUPERVISOR') {
    return this.employeesService.viewAllEmployees(role);
  }

  sendEmailToOneEmployee(employeeId: number, message: string) {
    return this.employeesService.sendEmail(employeeId, { message });
  }

  async sendEmailToAllEmployees(message: string) {
    const allEmployees = await this.listAllEmployees();
    const manager = allEmployees.find(
      (employee) => employee.role === 'MANAGER',
    );

    if (!manager) {
      throw new Error('Manager does not exist');
    }

    const idOfManager = manager.id;
    const emailOfManager = manager.emailAddress;

    const allEmailsOfEmployees = allEmployees.map(
      (employee) => employee.emailAddress,
    );

    const employeeEmailsWithoutManager = allEmailsOfEmployees.filter(
      (email) => email !== emailOfManager,
    );

    return this.employeesService.sendEmail(idOfManager, {
      message,
      bccEmails: employeeEmailsWithoutManager,
    });
  }

  giveTaskToEmployee(employeeId: number, task: string) {
    return null;
  }
}
