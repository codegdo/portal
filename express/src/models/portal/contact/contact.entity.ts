import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'portal', schema: 'org', name: 'contact' })
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;
}
