import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ database: 'portal', schema: 'org', name: 'Subscription' })
export class Subscription extends BaseEntity {
  @PrimaryColumn({ name: 'ModuleId' })
  moduleId!: number;

  @PrimaryColumn({ name: 'OrgId' })
  orgId!: number;

  @Column({ name: 'IsActive', default: true })
  isActive!: boolean;
}
