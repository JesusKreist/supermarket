import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateCustomerDto {
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
}
