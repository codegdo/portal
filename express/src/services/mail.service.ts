import { Service } from 'typedi';
import nodemailer from 'nodemailer';

export type MailOptions = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

export type TestAccount = {
  user: string;
  pass: string;
};

@Service()
export class MailService {
  private mailer;
  private initialize;

  constructor() {
    this.mailer = nodemailer;
    this.initialize = this.init();
  }

  async init(): Promise<any> {
    try {
      const testAccount = await this.mailer.createTestAccount();

      return this.mailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async send(options: MailOptions): Promise<void> {
    try {
      const transporter = await this.initialize;
      const info = await transporter.sendMail(options);

      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', this.mailer.getTestMessageUrl(info));
    } catch (error) {
      console.log(error);
    }
  }
}

export const getTestAccount = async (): Promise<nodemailer.TestAccount> => {
  return nodemailer.createTestAccount();
};
