import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { genSalt, hash } from 'bcryptjs';
import { Role } from '../entities';
import { ExceptionHttp } from '../../../app.exception';

@Entity({ database: 'portal', schema: 'sec', name: 'user' })
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'email_address' })
  emailAddress!: string;

  @Column({ name: 'username' })
  username!: string;

  @Column({ name: 'password', select: false })
  password!: string;

  @Column({ name: 'salt', select: false })
  salt!: string;

  @Column({ name: 'json', nullable: true })
  json!: string;

  // @Column({ name: 'company_id', nullable: true })
  // companyId!: number;

  // @Column({ name: 'contact_id', nullable: true })
  // contactId!: number;

  @OneToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @Column({ name: 'org_id', nullable: true })
  orgId!: number;

  // @Column({ name: 'is_new_password', default: false })
  // isNewPassword!: boolean;

  @Column({ name: 'is_active', default: false })
  isActive!: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.salt = await genSalt();
        this.password = await hash(this.password, this.salt);
      } catch (error) {
        throw new ExceptionHttp(500);
      }
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    try {
      const hashPassword = await hash(password, this.salt);
      return hashPassword === this.password;
    } catch (error) {
      throw new ExceptionHttp(500);
    }
  }
}
