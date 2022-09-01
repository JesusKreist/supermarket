import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { EmailPayload, MailService } from '../mail/mail.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  addNewEmployee(createEmployeeDto: CreateEmployeeDto) {
    return 'This action adds a new employee';
  }

  viewAllEmployees() {
    return this.prisma.employee.findMany();
  }

  viewOneEmployee(employeeId: number) {
    try {
      return this.prisma.employee.findUniqueOrThrow({
        where: { id: employeeId },
      });
    } catch (error) {
      throw new NotFoundException('Employee not found');
    }
  }

  updateDetails(employeeId: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.prisma.employee.update({
      where: { id: employeeId },
      data: updateEmployeeDto,
    });
  }

  changeRole(employeeId: number, newRole: 'CASHIER' | 'SUPERVISOR') {
    return this.prisma.employee.update({
      where: { id: employeeId },
      data: { role: newRole },
    });
  }

  removeEmployee(id: number) {
    // TODO perform soft delete
    return this.prisma.employee.delete({ where: { id: id } });
  }

  async sendEmail(id: number, message: string) {
    const employee = await this.viewOneEmployee(id);
    const emailPayload: EmailPayload = {
      firstName: employee.firstName,
      recipient: employee.emailAddress,
      message: message,
    };
    return this.mailService.sendTaskEmail(emailPayload);
  }
}
