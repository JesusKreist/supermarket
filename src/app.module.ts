import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { PrismaModule } from 'nestjs-prisma';
import { ManagersModule } from './managers/managers.module';
import { SupervisorsModule } from './supervisors/supervisors.module';
import { CashiersModule } from './cashiers/cashiers.module';
import { EmployeesModule } from './employees/employees.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    CustomersModule,
    ManagersModule,
    SupervisorsModule,
    CashiersModule,
    EmployeesModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
