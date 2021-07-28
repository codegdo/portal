import { EntityRepository, Repository } from 'typeorm';

import { Assignment } from './assignment.entity';

@EntityRepository(Assignment)
export class AssignmentRepository extends Repository<Assignment> {

}
