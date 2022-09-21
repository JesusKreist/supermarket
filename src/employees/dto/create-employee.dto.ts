import { Role } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @Length(3, 15)
  firstName: string;

  @IsNotEmpty()
  @Length(3, 15)
  lastName: string;

  @IsNotEmpty()
  @Length(10, 10)
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  @IsNotEmpty()
  streetAddress: string;

  @IsNotEmpty()
  cityAddress: string;

  @IsNotEmpty()
  stateAddress: string;

  @IsNotEmpty()
  @IsDateString()
  lastCheckInTime: Date;

  @IsNotEmpty()
  @IsBoolean()
  isCurrentlyOnShift: boolean;

  @IsNotEmpty()
  @Length(3, 15)
  role: Role;
}
