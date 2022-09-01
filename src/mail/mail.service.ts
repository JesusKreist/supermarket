import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

export type EmailPayload = {
  recipient: string;
  firstName: string;
  message: string;
};

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTaskEmail({ recipient, message, firstName }: EmailPayload) {
    console.log('The recipient is: ' + recipient);
    console.log('The message is: ' + message);
    return await this.mailerService.sendMail({
      to: recipient,
      from: '',
      subject: 'Task',
      context: {
        name: firstName,
        message: message,
      },
      template: 'task',
    });
  }
}
