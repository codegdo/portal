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

import * as bcrypt from 'bcrypt';
import { Role } from '../entities';
import { ExceptionHttp } from '../../../app.exception';

@Entity({ database: 'portal', schema: 'sec', name: 'user' })
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'email' })
  email!: string;

  @Column({ name: 'username' })
  username!: string;

  @Column({ name: 'password', select: false })
  password!: string;

  @Column({ name: 'data_column', nullable: true })
  dataColumn!: string;

  @Column({ name: 'is_active', default: false })
  isActive!: boolean;

  @Column({ name: 'salt', select: false })
  salt!: string;

  @OneToOne(() => Role, (role: Role) => role.id, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'role' })
  role!: Role;

  @Column({ name: 'org_id', nullable: true })
  orgId!: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, this.salt);
      } catch (error) {
        throw new ExceptionHttp(500);
      }
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    try {
      const hash = await bcrypt.hash(password, this.salt);
      return hash === this.password;
    } catch (error) {
      throw new ExceptionHttp(500);
    }
  }
}
