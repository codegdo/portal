import { NotFoundError } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { Program } from '../../../models/sales/entities';
import { SalesRepository } from '../../../models/sales/repositories';

@Service()
export class ProgramService {
  @Inject()
  private sales!: SalesRepository;

  async getPrograms(orgId: number): Promise<Program[]> {
    if (orgId) {
      return this.sales.programRepository.getPrograms(orgId);
    }

    return [];
  }

  async getProgramById(programId: number): Promise<Program> {
    const program = await this.sales.programRepository.getProgramById(programId);

    if (!program) {
      throw new NotFoundError('Not Found');
    }

    return program;
  }

  //async createProgram(): Promise<void> { }

  //async updateProgram(): Promise<void> { }

  //async deleteProgram(): Promise<void> { }
}
