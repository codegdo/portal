import { EntityRepository, Repository } from 'typeorm';
import { RoleType, Role } from './role.entity';

@EntityRepository(RoleType)
export class RoleTypeRepository extends Repository<RoleType> {}

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {}
