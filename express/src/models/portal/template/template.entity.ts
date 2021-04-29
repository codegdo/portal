import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'portal', schema: 'org', name: 'Template' })
export class Template extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'TemplateId' })
  id!: number;

  @Column({ name: 'Name', nullable: true })
  name!: string;

  @Column({ name: 'Type', nullable: true })
  type!: string;

  @Column({ name: 'Html', nullable: true })
  html!: string;

  @Column({ name: 'Style', nullable: true })
  style!: string;

  @Column({ name: 'Data', nullable: true })
  data!: string;

  @Column({ name: 'OrgId', nullable: true })
  orgId!: number;

  @Column({ name: 'IsActive', default: true })
  isActive!: boolean;
}
