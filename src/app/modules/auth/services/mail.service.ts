import { Injectable } from '@nestjs/common';
import * as sendgrid from '@sendgrid/mail';
import { environment } from 'src/app/environment';

@Injectable()
export class MailingService {
  constructor() {
    sendgrid.setApiKey(environment.mail.sendgrid.apiKey);
  }

  async sendVerifyEmailMail(email: string, token: string): Promise<void> {
    sendgrid
      .send({
        to: [email],
        from: environment.mail.defaultSender,
        templateId: environment.mail.sendgrid.templates.verifyEmail,
        dynamicTemplateData: {
          verificationUrl: `${environment.appDeeplinkBase}/verify-email?token=${token}&email=${email}`,
        },
      })
      .catch((err) =>
        console.log(
          'Something went wrong with sending the email',
          err.response.body.errors,
        ),
      );
  }

  async sendForgotPasswordMail(email: string, token: string): Promise<void> {
    sendgrid
      .send({
        to: [email],
        from: environment.mail.defaultSender,
        templateId: environment.mail.sendgrid.templates.resetPassword,
        dynamicTemplateData: {
          resetPasswordLink: `${environment.appDeeplinkBase}/reset-password?token=${token}&email=${email}`,
        },
      })
      .catch((err) =>
        console.log(
          'Something went wrong with sending the email',
          err.response.body.errors,
        ),
      );
  }

  async sendPasswordIsResetMail(email: string, token: string): Promise<void> {
    sendgrid
      .send({
        to: [email],
        from: environment.mail.defaultSender,
        templateId: environment.mail.sendgrid.templates.resetPassword,
        dynamicTemplateData: {
          resetPasswordLink: `${environment.appDeeplinkBase}/reset-password?token=${token}&email=${email}`,
        },
      })
      .catch((err) =>
        console.log(
          'Something went wrong with sending the email',
          err.response.body.errors,
        ),
      );
  }
}
