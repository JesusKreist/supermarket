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
import { SupervisorsService } from './supervisors.service';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';
import { EmployeesService } from '../employees/employees.service';

@Controller('supervisors')
export class SupervisorsController {
  constructor(private readonly supervisorsService: SupervisorsService) {}

  @Get()
  showAllCashiers(@Query('isOnShift') isOnShift?: boolean) {
    return this.supervisorsService.showAllCashiers(isOnShift);
  }

  @Post('send-email-to-all-cashiers')
  sendEmailToAllCashiers(@Body('message') message: string) {
    return this.supervisorsService.sendEmailToAllCashiers(message);
  }

  @Post('send-email-to-one-cashier')
  sendEmailToOneCashier(
    @Body('cashierId') cashierId: number,
    @Body('message') message: string,
  ) {
    return this.supervisorsService.sendEmailToOneCashier(cashierId, message);
  }

  @Patch('update-shift-status')
  changeCashierShiftStatus(
    @Body('cashierId') cashierId: number,
    @Body('isOnShift') isOnShift: boolean,
  ) {
    return this.supervisorsService.changeCashierShiftStatus(
      cashierId,
      isOnShift,
    );
  }
}
