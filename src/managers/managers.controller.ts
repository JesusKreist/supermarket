import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateEmployeeDto } from '../employees/dto/create-employee.dto';
import { ChangeRoleOfEmployeeDto } from './dto/change-role-of-employee.dto';

@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post('create-new-employee')
  createNewEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.managersService.createNewEmployee(createEmployeeDto);
  }

  @Patch('change-employee-role')
  update(@Body() changeRoleOfEmployeeDto: ChangeRoleOfEmployeeDto) {
    const { employeeId, newRole } = changeRoleOfEmployeeDto;
    return this.managersService.changeRoleOfEmployee(employeeId, newRole);
  }

  @Delete('soft-delete-employee')
  softDeleteEmployee(@Body('employeeId') employeeId: string) {
    return this.managersService.softDeleteEmployee(+employeeId);
  }

  @Get('list-all-employees')
  listAllEmployees() {
    return this.managersService.listAllEmployees();
  }

  @Post('send-email-to-one-employee')
  sendEmailToOneEmployee(
    @Body('employeeId') employeeId: number,
    @Body('message') message: string,
  ) {
    return this.managersService.sendEmailToOneEmployee(employeeId, message);
  }

  @Post('send-email-to-all-employees')
  sendEmailToAllEmployees(@Body('message') message: string) {
    return this.managersService.sendEmailToAllEmployees(message);
  }

  @Post('give-task-to-employee')
  giveTaskToEmployee(
    @Body('employeeId') employeeId: string,
    @Body('task') task: string,
  ) {
    return this.managersService.giveTaskToEmployee(+employeeId, task);
  }
}
