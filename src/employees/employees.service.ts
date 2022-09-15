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

  async addNewEmployee(createEmployeeDto: CreateEmployeeDto) {
    const newEmployee = await this.prisma.employee.create({
      data: createEmployeeDto,
    });
    return newEmployee;
  }

  async viewAllEmployees(role?: 'CASHIER' | 'SUPERVISOR', isOnShift?: boolean) {
    return isOnShift
      ? await this.prisma.employee.findMany({
          where: {
            role: role,
            isCurrentlyOnShift: true,
          },
        })
      : this.prisma.employee.findMany({
          where: {
            role: role,
          },
        });
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
