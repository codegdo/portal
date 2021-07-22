import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Program } from '../entities';

@Entity({ database: 'sales', schema: 'org', name: 'registration' })
export class Registration extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'reg_number', nullable: true })
  regNumber!: string;

  @Column({ name: 'json', nullable: true })
  json!: string;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @OneToOne(() => Program, (program) => program.id)
  @JoinColumn({ name: 'program_id' })
  program!: Program;

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
