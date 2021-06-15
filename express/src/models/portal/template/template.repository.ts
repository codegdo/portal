export class TemplateDto {}
import { InternalServerError } from 'routing-controllers';
import { EntityRepository, Repository } from 'typeorm';
import { Template } from './template.entity';

@EntityRepository(Template)
export class TemplateRepository extends Repository<Template> {
  async getTemplatesByOrg(orgId: number | null): Promise<Template[]> {
    const query = this.createQueryBuilder('template');

    try {
      const templates = await query
        .where('template.orgId = :orgId', { orgId })
        .getMany();
      return templates;
    } catch (error) {
      throw new InternalServerError('Internal server error');
    }
  }
}
