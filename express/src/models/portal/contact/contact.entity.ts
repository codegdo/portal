import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../entities';
import { Territory } from '../territory/territory.entity';

@Entity({ database: 'portal', schema: 'org', name: 'contact' })
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'first_name', nullable: true })
  firstName!: string;

  @Column({ name: 'last_name', nullable: true })
  lastName!: string;

  @Column({ name: 'title', nullable: true })
  title!: string;

  @Column({ name: 'street_address', nullable: true })
  streetAddress!: string;

  @Column({ name: 'city', nullable: true })
  city!: string;

  @Column({ name: 'postal_code', nullable: true })
  postalCode!: number;

  @OneToOne(() => Territory, (territory) => territory.id)
  @JoinColumn({ name: 'territory_id' })
  territory!: Territory;

  @Column({ name: 'json', nullable: true })
  json!: string;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @Column({ name: 'company_id', nullable: true })
  companyId!: number;

  @Column({ name: 'form_id', nullable: true })
  formId!: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'owner_id' })
  user!: User;

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
