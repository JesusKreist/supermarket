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
        include: { tasks: { select: { message: true } } },
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

  softDeleteEmployee(id: number) {
    return this.prisma.employee.update({
      where: { id: id },
      data: { isDeleted: true },
    });
  }

  async sendEmail(id: number, emailPayload: Partial<EmailPayload>) {
    const employee = await this.viewOneEmployee(id);
    emailPayload.recipient = employee.emailAddress;
    return this.mailService.sendTaskEmail(emailPayload as EmailPayload);
  }

  async giveTask(employeeId: number, jobToDo: string) {
    const employee = await this.viewOneEmployee(employeeId);
    const newTask = await this.prisma.task.create({
      data: {
        message: jobToDo,
        employeeId,
      },
    });

    await this.sendEmail(employeeId, {
      message: `Hi ${employee.firstName}, you have a new task: ${jobToDo}. You can view it on your dashboard.`,
    });

    return newTask;
  }
}
