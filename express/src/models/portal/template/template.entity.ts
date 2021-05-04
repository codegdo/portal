import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'portal', schema: 'org', name: 'template' })
export class Template extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'name', nullable: true })
  name!: string;

  @Column({ name: 'type', nullable: true })
  type!: string;

  @Column({ name: 'html', nullable: true })
  html!: string;

  @Column({ name: 'style', nullable: true })
  style!: string;

  @Column({ name: 'data', nullable: true })
  data!: string;

  @Column({ name: 'org_id', nullable: true })
  orgId!: number;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;
}
