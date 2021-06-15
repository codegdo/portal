import { Inject, Service } from 'typedi';
import { Template } from '../../models/portal/entities';
import { PortalRepository } from '../../models/portal/repositories';

@Service()
export class PreloadService {
  @Inject()
  private portal!: PortalRepository;

  getTemplatesByOrg = async (subdomain: string, user: any): Promise<Template[]> => {
    if (user) {
      return this.portal.templateRepository.getTemplatesByOrg(user.orgId);
    }

    console.log('SUB', subdomain);

    if (subdomain) {
      const org = await this.portal.orgRepository.findOne({
        where: [{ hostname: subdomain }],
      });

      if (org) {
        return this.portal.templateRepository.getTemplatesByOrg(org.id);
      }
    }

    return [];
  };
}
