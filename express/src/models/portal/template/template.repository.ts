export class TemplateDto {}
import { InternalServerError } from 'routing-controllers';
import { EntityRepository, Repository } from 'typeorm';
import { Template } from './template.entity';

@EntityRepository(Template)
export class TemplateRepository extends Repository<Template> {
  async getTemplatesByOrg(): Promise<Template[]> {
    const query = this.createQueryBuilder('template');

    try {
      const templates = await query.getMany();
      return templates;
    } catch (error) {
      throw new InternalServerError('Internal server error');
    }
  }
}
