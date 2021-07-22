import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ database: 'sales', schema: 'org', name: 'program' })
export class Program extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'name', nullable: false })
  name!: string;

  @Column({ name: 'description', nullable: true })
  description!: string;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @Column({ name: 'form_id', nullable: true })
  formId!: number;

  @Column({ name: 'owner_id', nullable: true })
  ownerId!: number;

  @Column({ name: 'org_id', nullable: true })
  orgId!: number;

  @Column({
    name: 'created_by',
  })
  createdBy!: 'CURRENT_USER';

  @Column({
    name: 'updated_by',
    onUpdate: 'CURRENT_USER',
  })
  updatedBy!: 'CURRENT_USER';

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;
}
