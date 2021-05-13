import { EntityRepository, Repository } from 'typeorm';

import { Token } from './token.entity';
import { TokenDto } from './token.dto';
import { ExceptionHttp } from '../../../app.exception';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {
  async createToken({ id, data, expiresAt }: TokenDto): Promise<void> {
    const token = new Token();
    token.id = id;
    token.expiresAt = expiresAt;
    token.data = data;

    try {
      await token.save();
    } catch (error) {
      throw new ExceptionHttp(500);
    }
  }

  // async deleteToken() {}
}
