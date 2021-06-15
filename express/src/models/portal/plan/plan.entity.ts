import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ database: 'portal', schema: 'dbo', name: 'plan' })
export class Plan extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'name', nullable: true })
  name!: string;

  @Column({ name: 'duration' })
  duration!: number;
}
