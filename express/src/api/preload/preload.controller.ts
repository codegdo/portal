//import { Request } from 'express';
import { Get, JsonController, QueryParam } from 'routing-controllers';
import { Inject } from 'typedi';
import { PreloadService } from './preload.service';

@JsonController('/preload')
export class PreloadController {
  @Inject()
  private preloadService!: PreloadService;

  @Get('/start')
  async getStart(@QueryParam('subdomain') subdomain: string) {
    const templates = await this.preloadService.getTemplatesByOrg();
    console.log(subdomain);
    return { orgId: null, templates };
  }
}
