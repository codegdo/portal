import { Inject, Service } from 'typedi';
import { Program } from '../../../models/sales/entities';
import { SalesRepository } from '../../../models/sales/repositories';

@Service()
export class ProgramService {
  @Inject()
  private sales!: SalesRepository;

  async getAllPrograms(orgId: number): Promise<Program[]> {

    if (orgId) {
      return this.sales.programRepository.getAllPrograms(orgId);
    }

    return [];
  }

  //async createProgram(): Promise<void> { }

  //async updateProgram(): Promise<void> { }

  //async deleteProgram(): Promise<void> { }
}
