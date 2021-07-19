import { InternalServerError } from 'routing-controllers';
import { EntityRepository, Repository } from 'typeorm';
import { Program } from './program.entity';

@EntityRepository(Program)
export class ProgramRepository extends Repository<Program> {
  async getProgramsByOrg(orgId: number | null): Promise<Program[]> {
    const query = this.createQueryBuilder('program');

    try {
      const programs = await query
        .where('program.orgId = :orgId', { orgId })
        .getMany();
      return programs;
    } catch (error) {
      throw new InternalServerError('Internal server error');
    }
  }
}
