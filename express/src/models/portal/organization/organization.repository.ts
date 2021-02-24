import { EntityRepository, Repository } from 'typeorm';
import { Organization } from './organization.entity';

@EntityRepository(Organization)
export class OrganizationRepository extends Repository<Organization> {
  async createOrg(createOrgDto: any): Promise<Organization> {
    const { owner } = createOrgDto;
    const org = new Organization();
    org.owner = owner;
    await org.save();
    return org;
  }
}
