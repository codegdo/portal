import { Service } from 'typedi';

@Service()
export class MailService {
  private sendEmail(): void {
    //
  }

  send() {
    this.sendEmail();
  }
}
