import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ database: 'portal', schema: 'sec', name: 'Organization' })
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'OrgId' })
  id!: number;

  @Column({ name: 'Name', nullable: true })
  name!: string;

  @Column({ name: 'StreetAddress', nullable: true })
  streetAddress!: string;

  @Column({ name: 'City', nullable: true })
  city!: string;

  @Column({ name: 'State', nullable: true })
  state!: string;

  @Column({ name: 'TerritoryId', nullable: true })
  territoryId!: string;

  @Column({ name: 'PostalCode', nullable: true })
  postalCode!: number;

  @Column({ name: 'Website', nullable: true })
  website!: string;

  @Column({ name: 'Phone', nullable: true })
  phone!: number;

  @Column({ name: 'Fax', nullable: true })
  fax!: number;

  @Column({ name: 'IsActive', default: true })
  isActive!: boolean;

  @OneToOne((_type) => User)
  @JoinColumn({ name: 'OwnerId' })
  owner!: User;
}
