import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Policy } from '../policy/policy.entity';

export enum RoleTypeName {
  SYSTEM = 'SYSTEM',
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}

@Entity({ database: 'portal', schema: 'dbo', name: 'roletype' })
export class RoleType extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({
    name: 'name',
    type: 'enum',
    enum: RoleTypeName,
  })
  name!: RoleTypeName;
}

@Entity({ database: 'portal', schema: 'sec', name: 'role' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'name', nullable: true })
  name!: string;

  @Column({ name: 'description', nullable: true })
  description!: string;

  @Column({ name: 'is_owner', default: false })
  isOwner!: boolean;

  @ManyToOne(() => RoleType, (roletype) => roletype.id)
  @JoinColumn({ name: 'roletype_id' })
  roleType!: RoleType;

  @ManyToMany(() => Policy, (policy: Policy) => policy.roles)
  @JoinTable({
    name: 'role_policy',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'policy_id',
      referencedColumnName: 'id',
    },
  })
  policies!: Policy[];

  @Column({ name: 'org_id', nullable: true })
  orgId!: number;
}
