import {
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
export class Registration {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'reg_number', default: 'REG', nullable: false })
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

  @Column({ name: 'created_by', default: 'CURRENT_USER' })
  createdBy!: string;

  @Column({ name: 'updated_by', default: 'CURRENT_USER' })
  updatedBy!: string;

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
