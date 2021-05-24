import { EntityRepository, Repository } from 'typeorm';
import { InternalServerError } from 'routing-controllers';

import { Token } from './token.entity';
import { TokenDto } from './token.dto';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {
  async createToken({ id, json, expiredAt }: TokenDto): Promise<Token> {
    const token = new Token();
    token.id = id;
    token.expiredAt = expiredAt;
    token.json = json;

    try {
      return token.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerError('Internal server error');
    }
  }

  // async deleteToken() {}

  getToken({ id, json, expiredAt }: TokenDto): Token {
    const token = new Token();
    token.id = id;
    token.expiredAt = expiredAt;
    token.json = json;

    return token;
  }
}
