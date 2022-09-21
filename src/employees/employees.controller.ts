import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  addNewEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    console.log(createEmployeeDto);
    return this.employeesService.addNewEmployee(createEmployeeDto);
  }

  @Get()
  viewAllEmployees(
    @Body('role') role: 'CASHIER' | 'SUPERVISOR',
    @Body('isOnShift') isOnShift: boolean,
  ) {
    return this.employeesService.viewAllEmployees(role, isOnShift);
  }

  @Get(':id')
  viewOneEmployee(@Param('id') id: string) {
    return this.employeesService.viewOneEmployee(+id);
  }

  @Patch('change-role/:id')
  changeRole(
    @Param('id') id: string,
    @Body('newRole') newRole: 'CASHIER' | 'SUPERVISOR',
  ) {
    return this.employeesService.changeRole(+id, newRole);
  }

  @Patch('update-details/:id')
  updateDetails(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.updateDetails(+id, updateEmployeeDto);
  }

  @Delete(':id')
  removeEmployee(@Param('id') id: string) {
    return this.employeesService.removeEmployee(+id);
  }

  @Post('send-employee-mail')
  sendEmailToEmployee(
    @Body('id') id: string,
    @Body('message') message: string,
  ) {
    return this.employeesService.sendEmail(+id, { message });
  }
}
