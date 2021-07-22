import { EntityRepository, Repository } from 'typeorm';
import { CreateOrgDto } from './organization.dto';
import { Organization } from './organization.entity';

@EntityRepository(Organization)
export class OrganizationRepository extends Repository<Organization> {
  async createOrg(createOrgDto: CreateOrgDto): Promise<Organization> {
    const { name, subdomain, owner } = createOrgDto;
    const org = new Organization();
    org.owner = owner;
    org.name = name;
    org.subdomain = subdomain;
    await org.save();
    return org;
  }
}
