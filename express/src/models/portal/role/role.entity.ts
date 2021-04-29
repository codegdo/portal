import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

export enum RoleTypeEnum {
  SYSTEM = 'system',
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}

@Entity({ database: 'portal', schema: 'dbo', name: 'RoleType' })
export class RoleType extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'RoleTypeId' })
  id!: number;

  @Column({
    type: 'enum',
    enum: RoleTypeEnum,
    name: 'RoleType',
  })
  roleType!: RoleTypeEnum;
}

@Entity({ database: 'portal', schema: 'sec', name: 'Role' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'RoleId' })
  id!: number;

  @Column({ name: 'Name', nullable: true })
  name!: string;

  @Column({ name: 'Description', nullable: true })
  description!: string;

  @Column({ name: 'IsOwner', default: false })
  isOwner!: boolean;

  @ManyToOne((_type) => RoleType)
  @JoinColumn({ name: 'RoleTypeId' })
  roleType!: RoleType;

  @Column({ name: 'OrgId', nullable: true })
  orgId!: number;
}
