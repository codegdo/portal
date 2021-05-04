import { Inject, Service } from 'typedi';
import { Template } from '../../models/portal/entities';
import { PortalRepository } from '../../models/portal/repositories';

@Service()
export class PreloadService {
  @Inject()
  private portal!: PortalRepository;

  getTemplatesByOrg = async (): Promise<Template[]> => {
    const templates = await this.portal.templateRepository.getTemplatesByOrg();
    return templates;
  };
}
