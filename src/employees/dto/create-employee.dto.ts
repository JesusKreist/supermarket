import { Role } from '@prisma/client';

export class CreateEmployeeDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  streetAddress: string;
  cityAddress: string;
  stateAddress: string;
  lastCheckInTime: Date;
  isCurrentlyOnShift: boolean;
  role: Role;
}
