import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

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

  @Column({ name: 'org_id', nullable: true })
  orgId!: number;
}
