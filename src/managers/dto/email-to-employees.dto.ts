import { IsNumber, IsNotEmpty, IsString, Length } from 'class-validator';

export class EmailToOneEmployeeDto {
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @IsString()
  @Length(10)
  message: string;
}

export class EmailToAllEmployeeDto {
  @IsString()
  @Length(10)
  message: string;
}
