import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ database: 'portal', schema: 'dbo', name: 'emailtype' })
export class EmailType extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'name', nullable: true })
  name!: string;
}

@Entity({ database: 'portal', schema: 'org', name: 'email' })
export class Email extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'name', nullable: true })
  name!: string;

  @Column({ name: 'html', nullable: true })
  html!: string;

  @Column({ name: 'json', nullable: true })
  json!: string;

  @ManyToOne(() => EmailType, (emailtype) => emailtype.id)
  @JoinColumn({ name: 'emailtype_id' })
  emailtype!: EmailType;

  @Column({ name: 'org_id', nullable: true })
  orgId!: number;
}
