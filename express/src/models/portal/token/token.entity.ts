import { BaseEntity, Entity, PrimaryColumn, Column } from 'typeorm';
import crypto from 'crypto';
import { TokenDto } from './token.dto';

export interface TokenData {
  maxAge?: number;
  data?: string;
}

@Entity({ database: 'portal', schema: 'sec', name: 'token' })
export class Token extends BaseEntity {
  @PrimaryColumn({ name: 'id' })
  id!: string;

  @Column({ name: 'expires_at' })
  expiresAt!: number;

  @Column({ name: 'data' })
  data!: string;

  create({ data = '{}', maxAge = 86400 }: TokenData) {
    const token: TokenDto = {
      id: crypto.randomBytes(16).toString('hex'),
      expiresAt: Math.floor(new Date().getTime() / 1000 + maxAge),
      data: data,
    };

    return token;
  }

  //validate() {}

  //hash() {}

  //encypt() {}

  //decrypt() {}

  //encode() {}

  //decode() {}
}
