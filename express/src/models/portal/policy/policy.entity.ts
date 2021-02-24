import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ database: 'portal', schema: 'sec', name: 'Policy' })
export class Policy extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'PolicyId' })
  id!: number;

  @Column({ name: 'Name', nullable: true })
  name!: string;

  @Column({ name: 'Description', nullable: true })
  description!: string;

  @Column({ name: 'DataPolicy', nullable: true })
  dataPolicy!: string;

  @Column({ name: 'IsActive', default: false })
  isActive!: boolean;

  @Column({ name: 'OrgId', nullable: true })
  orgId!: number;

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

/*
INSERT
INTO sec."Permission"
VALUES
('1', 'None'),
('2', 'Read'),
('3', 'Write');
*/
