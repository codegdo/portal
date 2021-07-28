import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Territory } from '../entities';

@Entity({ database: 'portal', schema: 'org', name: 'company' })
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'name', nullable: false })
  name!: string;

  @Column({ name: 'billing_street_address', nullable: true })
  billingStreetAddress!: string;

  @Column({ name: 'billing_city', nullable: true })
  billingCity!: string;

  @Column({ name: 'billing_postal_code', nullable: true })
  billingPostalCode!: number;

  @Column({ name: 'billing_state', nullable: true })
  billingState!: string;

  @Column({ name: 'billing_country', nullable: true })
  billingCountry!: string;

  @OneToOne(() => Territory, (territory) => territory.id)
  @JoinColumn({ name: 'billing_territory_id' })
  territory!: Territory;

  @Column({ name: 'form_id', nullable: true })
  formId!: number;

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
