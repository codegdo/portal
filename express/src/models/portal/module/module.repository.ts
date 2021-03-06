import { EntityRepository, Repository } from 'typeorm';
import { Subscription } from '../subscription/subscription.entity';
import { Module } from './module.entity';

@EntityRepository(Module)
export class ModuleRepository extends Repository<Module> {
  async getModuleByUser(orgId: number, roletype: string): Promise<Module[]> {
    switch (roletype) {
      case 'system':
        return this.createQueryBuilder('module')
          .leftJoinAndSelect('module.pages', 'pages')
          .leftJoin(Subscription, 'subscription', 'module.id = subscription.module')
          .select(['module.id', 'module.name', 'module.sortGroup', 'pages.id', 'pages.name', 'pages.sortOrder', 'pages.parentId'])
          .where('subscription.orgId = :orgId', { orgId })
          .andWhere('CURRENT_TIMESTAMP < subscription.end_date')
          .orWhere('module.is_subscription = :isSubscription', {
            isSubscription: false,
          })
          .orderBy('module.sort_order', 'ASC')
          .getMany();
      case 'internal':
        return this.createQueryBuilder('module')
          .leftJoinAndSelect('module.pages', 'pages')
          .leftJoin(Subscription, 'subscription', 'module.id = subscription.module')
          .select(['module.id', 'module.name', 'module.sortGroup', 'pages.id', 'pages.name', 'pages.sortOrder', 'pages.parentId'])
          .where('subscription.orgId = :orgId', { orgId })
          .andWhere('CURRENT_TIMESTAMP < subscription.end_date')
          .orWhere('module.is_subscription = :isSubscription', {
            isSubscription: false,
          })
          .andWhere('module.is_internal = :isInternal', { isInternal: true })
          .orderBy('module.sort_order', 'ASC')
          .getMany();
      default:
        return this.createQueryBuilder('module')
          .leftJoinAndSelect('module.pages', 'pages')
          .leftJoin(Subscription, 'subscription', 'module.id = subscription.module')
          .select(['module.id', 'module.name', 'module.sortGroup', 'pages.id', 'pages.name', 'pages.sortOrder', 'pages.parentId'])
          .where('subscription.orgId = :orgId', { orgId })
          .andWhere('CURRENT_TIMESTAMP < subscription.end_date')
          .orWhere('module.is_subscription = :isSubscription', {
            isSubscription: false,
          })
          .andWhere('module.is_external = :isExternal', { isExternal: true })
          .orderBy('module.sort_order', 'ASC')
          .getMany();
    }
  }
}
