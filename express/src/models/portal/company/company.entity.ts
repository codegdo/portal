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

  @OneToOne(() => Territory, (territory) => territory.id)
  @JoinColumn({ name: 'billing_territory_id' })
  billingTerritory!: Territory;

  @Column({ name: 'shipping_street_address', nullable: true })
  shippingStreetAddress!: string;

  @Column({ name: 'shipping_city', nullable: true })
  shippingCity!: string;

  @Column({ name: 'shipping_postal_code', nullable: true })
  shippingPostalCode!: number;

  @OneToOne(() => Territory, (territory) => territory.id)
  @JoinColumn({ name: 'shipping_territory_id' })
  shippingTerritory!: Territory;



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
