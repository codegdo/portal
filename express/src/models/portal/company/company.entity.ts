import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'portal', schema: 'org', name: 'company' })
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;
}
