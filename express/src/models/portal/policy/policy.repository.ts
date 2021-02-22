import { EntityRepository, Repository } from 'typeorm';
import { Policy } from './policy.entity';

@EntityRepository(Policy)
export class PermissionRepository extends Repository<Policy> {}
