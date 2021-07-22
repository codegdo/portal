import { CurrentUser, Get, JsonController } from 'routing-controllers';
import { User } from '../../../models/portal/entities';

@JsonController()
export class HomeController {
  @Get('/')
  async home(@CurrentUser() _user?: User) {
    return 'home';
  }
}
