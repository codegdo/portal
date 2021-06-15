import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ISession } from 'connect-typeorm';
//import { SessionEntity } from 'typeorm-store';

@Entity({ database: 'portal', schema: 'sec', name: 'session' })
export class Session implements ISession {
  @PrimaryColumn({ name: 'id' })
  id!: string;

  @Column({ name: 'json' })
  json!: string;

  @Column({ name: 'expired_at' })
  expiredAt!: number;
}
