import { EntityRepository, Repository } from 'typeorm';
import { Subscription } from './subscription.entity';

@EntityRepository(Subscription)
export class SubscriptionRepository extends Repository<Subscription> {
  async createSub(createOrgDto: any): Promise<Subscription> {
    const { orgId, moduleId } = createOrgDto;
    const sub = new Subscription();
    sub.orgId = orgId;
    sub.moduleId = moduleId;
    await sub.save();
    return sub;
  }
}
