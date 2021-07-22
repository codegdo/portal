import { InternalServerError } from 'routing-controllers';
import { EntityRepository, Repository } from 'typeorm';

import { CreateRegistrationDto } from './registration.dto';
import { Program } from '../program/program.entity';
import { Registration } from './registration.entity';


@EntityRepository(Registration)
export class RegistrationRepository extends Repository<Registration> {

  async getAllRegistrations(orgId: number | null): Promise<Registration[]> {
    const query = this.createQueryBuilder('registration');

    try {
      const registrations = await query
        .where('registration.orgId = :orgId', { orgId })
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

  async createRegistration(createRegistrationDto: CreateRegistrationDto): Promise<Registration> {
    const { regNumber, formId, ownerId, orgId } = createRegistrationDto;
    const program = new Program();
    const registration = new Registration();

    program.id = 1;

    registration.regNumber = regNumber;
    registration.program = program;
    registration.formId = formId;
    registration.ownerId = ownerId;
    registration.orgId = orgId;

    console.log('REGISTRATION', registration);

    try {
      return registration.save();
    } catch (e) {
      throw new InternalServerError('Internal server error');
    }
  }
}
