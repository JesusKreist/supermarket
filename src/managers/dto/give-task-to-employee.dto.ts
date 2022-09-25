import { IsByteLength, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GiveTaskToEmployeeDto {
  @IsNumber()
  @IsNotEmpty()
  employeeId: number;

  @IsString()
  @IsByteLength(10, 9999)
  jobToDo: string;
}
