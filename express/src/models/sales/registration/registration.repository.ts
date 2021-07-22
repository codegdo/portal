import { InternalServerError } from 'routing-controllers';
import { EntityRepository, Repository } from 'typeorm';

import { CreateRegDto } from './registration.dto';
import { Program } from '../program/program.entity';
import { Registration } from './registration.entity';

@EntityRepository(Registration)
export class RegistrationRepository extends Repository<Registration> {
  async getAllRegistrations(programId: number): Promise<Registration[]> {
    const query = this.createQueryBuilder('registration');

    try {
      const registrations = await query
        .where('registration.program = :programId', { programId })
        .getMany();

      return registrations;
    } catch (e) {
      throw new InternalServerError('Internal server error');
    }
  }

  async getRegistrationById(regId: number): Promise<Registration | undefined> {
    const query = this.createQueryBuilder('registration');

    try {
      const registration = await query
        .where('registration.id = :regId', { regId })
        .getOne();

      return registration;
    } catch (e) {
      throw new InternalServerError('Internal server error');
    }
  }

  async createRegistration(
    createRegDto: CreateRegDto
  ): Promise<Registration> {
    const { programId, regNumber, formId, ownerId, orgId, createdBy, updatedBy } = createRegDto;
    const program = new Program();
    const registration = new Registration();

    program.id = programId;

    registration.regNumber = regNumber;
    registration.program = program;
    registration.formId = formId;
    registration.ownerId = ownerId;
    registration.orgId = orgId;
    registration.createdBy = createdBy;
    registration.updatedBy = updatedBy;

    console.log('REGISTRATION', registration);

    try {
      // return registration.save(); ERROR: relation "org.registration" does not exist
      const result = await this.save(registration);
      return this.save({ id: result.id, regNumber: `${result.regNumber}${result.id}` });
    } catch (e) {
      console.log(e);
      throw new InternalServerError('Internal server error');
    }
  }
}
