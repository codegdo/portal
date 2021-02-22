import { Entity, PrimaryColumn, Column } from 'typeorm';

import { SessionEntity } from 'typeorm-store';

@Entity({ database: 'portal', schema: 'sec', name: 'Session' })
export class Session implements SessionEntity {
  @PrimaryColumn({ name: 'SessionId' })
  id!: string;

  @Column({ name: 'ExpiresAt' })
  expiresAt!: number;

  @Column({ name: 'SessionData' })
  data!: string;
}
