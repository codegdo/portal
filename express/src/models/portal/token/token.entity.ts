import { BaseEntity, Entity, PrimaryColumn, Column } from 'typeorm';
import crypto from 'crypto';
import { TokenDto } from './token.dto';

export interface TokenData {
  maxAge?: number;
  json?: string;
}

@Entity({ database: 'portal', schema: 'sec', name: 'token' })
export class Token extends BaseEntity {
  @PrimaryColumn({ name: 'id' })
  id!: string;

  @Column({ name: 'expired_at' })
  expiredAt!: number;

  @Column({ name: 'json' })
  json!: string;

  create({ json = '{}', maxAge = 86400 }: TokenData): TokenDto {
    const token: TokenDto = {
      id: crypto.randomBytes(16).toString('hex'),
      expiredAt: Math.floor(new Date().getTime() / 1000 + maxAge),
      json: json,
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
