import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  //OneToMany,
} from 'typeorm';
import { Page } from '../page/page.entity';

@Entity({ database: 'portal', schema: 'dbo', name: 'module' })
export class Module extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'name', nullable: false })
  name!: string;

  @Column({ name: 'sort_order', default: 0 })
  sortOrder!: number;

  @Column({ name: 'is_external', default: false })
  isExternal!: boolean;

  @Column({ name: 'is_internal', default: false })
  isInternal!: boolean;

  @Column({ name: 'is_subscription', default: false })
  isSubscription!: boolean;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  //@OneToMany(() => Page, page => page.module)
  //pages!: Page[];

  // Use middle table to join
  @ManyToMany(() => Page, (page: Page) => page.modules)
  @JoinTable({
    name: 'module_page',
    joinColumn: {
      name: 'module_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'page_id',
      referencedColumnName: 'id',
    },
  })
  pages!: Page[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;
}
