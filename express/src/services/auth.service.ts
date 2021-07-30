import { Service, Container, Inject } from 'typedi';
import { Program } from '../models/sales/entities';
import { SalesRepository } from '../models/sales/repositories';
import { JwtService } from './jwt.service';

@Service()
class Authorize {
  @Inject()
  private sales!: SalesRepository;

  @Inject()
  public jwt!: JwtService;

  async getPrograms(orgId: number): Promise<Program[]> {
    const programs = await this.sales.programRepository.getPrograms(orgId);

    return programs;
  }

  // auth modules

  // auth pages

  // auth programs
  async programAuthorize(programId: number, orgId: number): Promise<boolean> {
    const programs = await this.getPrograms(orgId);

    if (programs.filter((p) => p.id === programId).length > 0) {
      return true;
    }

    return false;
  }
}

export const auth = Container.get(Authorize);
