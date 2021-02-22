import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

export enum RoleTypeEnum {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
  SYSTEM = 'SYSTEM',
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

/*
INSERT
INTO dbo."RoleType"
VALUES
('1', 'INTERNAL'),
('2', 'EXTERNAL'),
('3', 'SYSTEM');
*/
