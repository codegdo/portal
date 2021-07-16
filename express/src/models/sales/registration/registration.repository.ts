import { EntityRepository, Repository } from 'typeorm';
import { Registration } from './registration.entity';

@EntityRepository(Registration)
export class RegistrationmRepository extends Repository<Registration> {

}
