import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Company, User } from '../entities';

export enum AssignmentTypeCompanyEnum {
  REGION = 'region',
  COUNTRY = 'country',
  STATE = 'state',
  COMPANY = 'company',
}

export enum AssignmentTypeUserEnum {
  USER = 'user',
  GROUP = 'group',
  ROLE = 'role',
}

@Entity({ database: 'portal', schema: 'org', name: 'assignment' })
export class Assignment extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'name', nullable: false })
  name!: string;

  @Column({ name: 'owner_id', nullable: true })
  ownerId!: number;

  @Column({ name: 'org_id', nullable: true })
  orgId!: number;

  @Column({ name: 'is_active', default: false })
  isActive!: boolean;

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

@Entity({ database: 'portal', schema: 'org', name: 'assignment_company' })
export class AssignmentCompany extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({
    name: 'assignment_type',
    type: 'enum',
    enum: AssignmentTypeCompanyEnum,
  })
  assignmentType!: AssignmentTypeCompanyEnum;

  @OneToOne(() => Assignment, assignment => assignment.id)
  @JoinColumn({ name: 'assignment_id' })
  assignment!: Assignment;

  @OneToOne(() => Company, company => company.id)
  @JoinColumn({ name: 'company_id' })
  company!: Company;

  @Column({ name: 'owner_id', nullable: true })
  ownerId!: number;

  @Column({ name: 'org_id', nullable: true })
  orgId!: number;

  @Column({ name: 'is_active', default: false })
  isActive!: boolean;

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

@Entity({ database: 'portal', schema: 'org', name: 'assignment_user' })
export class AssignmentUser extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({
    name: 'assignment_type',
    type: 'enum',
    enum: AssignmentTypeUserEnum,
  })
  assignmentType!: AssignmentTypeUserEnum;

  @OneToOne(() => Assignment, assignment => assignment.id)
  @JoinColumn({ name: 'assignment_id' })
  assignment!: Assignment;

  @OneToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'owner_id', nullable: true })
  ownerId!: number;

  @Column({ name: 'org_id', nullable: true })
  orgId!: number;

  @Column({ name: 'is_active', default: false })
  isActive!: boolean;

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