//import { Request } from 'express';
import {
  Session,
  Authorized,
  Get,
  JsonController,
  QueryParam,
} from 'routing-controllers';
import { Inject } from 'typedi';
import { PreloadService } from './preload.service';

@JsonController('/preload')
export class PreloadController {
  @Inject()
  private preloadService!: PreloadService;

  @Authorized()
  @Get('/start')
  async getStart(
    @Session() { user }: any,
    @QueryParam('subdomain') subdomain: string
  ) {
    const templates = await this.preloadService.getTemplatesByOrg(subdomain, user);

    return { templates, user };
  }
}
