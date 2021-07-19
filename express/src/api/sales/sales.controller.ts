import { Get, JsonController, QueryParam } from 'routing-controllers';
import { Inject } from 'typedi';
import { SalesService } from './sales.service';

@JsonController('/sales')
export class SalesController {
  @Inject()
  private salesService!: SalesService;

  @Get('/')
  async getPrograms(@QueryParam('orgId') orgId: number) {
    const programs = await this.salesService.getProgramsByOrg(orgId);

    return programs;
  }
}
