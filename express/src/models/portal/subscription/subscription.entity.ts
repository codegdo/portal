import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ database: 'portal', schema: 'org', name: 'subscription' })
export class Subscription extends BaseEntity {
  @PrimaryColumn({ name: 'module_id' })
  moduleId!: number;

  @PrimaryColumn({ name: 'org_id' })
  orgId!: number;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;
}
