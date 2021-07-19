import { EntityRepository, Repository } from 'typeorm';
import { Registration } from './registration.entity';

@EntityRepository(Registration)
export class RegistrationRepository extends Repository<Registration> {}
