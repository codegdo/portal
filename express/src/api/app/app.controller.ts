//import { Request } from 'express';
import { Get, JsonController, QueryParam } from 'routing-controllers';
import { Inject } from 'typedi';
import { AppService } from './app.service';

@JsonController('/app')
export class LoadController {
  @Inject()
  private appService!: AppService;

  @Get('/start')
  async getStart(@QueryParam('subdomain') subdomain: string) {
    const templates = await this.appService.getTemplatesByOrg();

    return { subdomain, templates };
  }
}
