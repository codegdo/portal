import { Service } from 'typedi';
import { Connection, getConnection } from 'typeorm';
import { UserRepository } from './user/user.repository';
import { TokenRepository } from './token/token.repository';

@Service()
export class PortalRepository {
  get connection(): Connection {
    return getConnection('default');
  }

  get userRepository(): UserRepository {
    // this.connection.transaction((manager) => manager.query(''));
    return this.connection.getCustomRepository(UserRepository);
  }

  get tokenRepository(): TokenRepository {
    return this.connection.getCustomRepository(TokenRepository);
  }
}
