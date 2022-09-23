import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export enum SubRoles {
  CASHIER = 'CASHIER',
  SUPERVISOR = 'SUPERVISOR',
}

export class ChangeRoleOfEmployeeDto {
  @IsNumber()
  @IsNotEmpty()
  employeeId: number;

  @IsEnum(SubRoles)
  newRole: 'CASHIER' | 'SUPERVISOR';
}
