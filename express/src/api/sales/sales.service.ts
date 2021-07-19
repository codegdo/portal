import { Inject, Service } from 'typedi';
import { Program } from '../../models/sales/entities';
import { SalesRepository } from '../../models/sales/repositories';

@Service()
export class SalesService {
  @Inject()
  private sales!: SalesRepository;

  getProgramsByOrg = async (orgId: number): Promise<Program[]> => {
    if (orgId) {
      return this.sales.programRepository.getProgramsByOrg(orgId);
    }

    return [];
  };
}
