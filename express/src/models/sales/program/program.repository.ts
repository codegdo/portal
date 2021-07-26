import { InternalServerError } from 'routing-controllers';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProgramDto } from './program.dto';
import { Program } from './program.entity';

@EntityRepository(Program)
export class ProgramRepository extends Repository<Program> {
  async getPrograms(orgId: number | null): Promise<Program[]> {
    const query = this.createQueryBuilder('program');

    try {
      const programs = await query
        .where('program.orgId = :orgId', { orgId })
        .getMany();

      return programs;
    } catch (e) {
      throw new InternalServerError('Internal server error');
    }
  }

  async getProgramById(programId: number): Promise<Program | undefined> {
    const query = this.createQueryBuilder('program');

    try {
      const program = await query
        .where('program.id = :programId', { programId })
        .getOne();

      return program;
    } catch (e) {
      throw new InternalServerError('Internal server error');
    }
  }

  async createProgram({
    name,
    description,
    formId,
    ownerId,
    orgId,
  }: CreateProgramDto): Promise<Program> {
    const program = this.create({
      name,
      description,
      formId,
      ownerId,
      orgId,
    });

    try {
      return this.save(program);
    } catch (e) {
      throw new InternalServerError('Internal server error');
    }
  }
}
