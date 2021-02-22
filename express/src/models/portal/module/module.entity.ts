import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ database: 'portal', schema: 'dbo', name: 'Module' })
export class Module extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'ModuleId' })
  id!: number;

  @Column({ name: 'Name', nullable: false })
  name!: string;

  @Column({ name: 'SortOrder', default: 0 })
  sortOrder!: number;

  @Column({ name: 'IsExternal', default: false })
  isExternal!: boolean;

  @Column({ name: 'IsInternal', default: false })
  isInternal!: boolean;

  @Column({ name: 'IsSubscriptionRequired', default: false })
  isSubscriptionRequired!: boolean;

  @Column({ name: 'IsActive', default: true })
  isActive!: boolean;

  @CreateDateColumn({
    name: 'CreatedAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'UpdatedAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date;
}
