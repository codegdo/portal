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

@Entity({ database: 'portal', schema: 'sec', name: 'User' })
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'UserId' })
  id!: number;

  @Column({ name: 'Email' })
  email!: string;

  @Column({ name: 'Username' })
  username!: string;

  @Column({ name: 'Password', select: false })
  password!: string;

  @Column({ name: 'DataColumn', nullable: true })
  dataColumn!: string;

  @Column({ name: 'IsActive', default: false })
  isActive!: boolean;

  @Column({ name: 'Salt', select: false })
  salt!: string;

  @OneToOne((_type) => Role)
  @JoinColumn({ name: 'RoleId' })
  role!: Role;

  @Column({ name: 'OrgId', nullable: true })
  orgId!: number;

  @CreateDateColumn({
    name: 'CreatedAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'UpdatedAt',
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
