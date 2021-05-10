import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Role } from '../entities';

@Entity({ database: 'portal', schema: 'sec', name: 'policy' })
export class Policy extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'name', nullable: true })
  name!: string;

  @Column({ name: 'description', nullable: true })
  description!: string;

  @Column({ name: 'data', nullable: true })
  data!: string;

  @Column({ name: 'is_active', default: false })
  isActive!: boolean;

  @Column({ name: 'org_id', nullable: true })
  orgId!: number;

  @ManyToMany(() => Role, (role: Role) => role.policies)
  roles!: Role[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
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
