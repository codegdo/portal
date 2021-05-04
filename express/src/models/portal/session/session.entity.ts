import { Entity, PrimaryColumn, Column } from 'typeorm';

import { SessionEntity } from 'typeorm-store';

@Entity({ database: 'portal', schema: 'sec', name: 'session' })
export class Session implements SessionEntity {
  @PrimaryColumn({ name: 'id' })
  id!: string;

  @Column({ name: 'expires_at' })
  expiresAt!: number;

  @Column({ name: 'session_data' })
  data!: string;
}
