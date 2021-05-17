import { Service } from 'typedi';
import { Connection, getConnection } from 'typeorm';
import { UserRepository } from './user/user.repository';
import { SessionRepository } from './session/session.repository';
import { TokenRepository } from './token/token.repository';
import { TemplateRepository } from './template/template.repository';
import { OrganizationRepository } from './organization/organization.repository';
import { RoleRepository } from './role/role.repository';
import { PolicyRepository } from './policy/policy.repository';

@Service()
export class PortalRepository {
  get connection(): Connection {
    return getConnection('default');
  }

  get userRepository(): UserRepository {
    // this.connection.transaction((manager) => manager.query(''));
    return this.connection.getCustomRepository(UserRepository);
  }

  get orgRepository(): OrganizationRepository {
    return this.connection.getCustomRepository(OrganizationRepository);
  }

  get roleRepository(): RoleRepository {
    return this.connection.getCustomRepository(RoleRepository);
  }

  get policyRepository(): PolicyRepository {
    return this.connection.getCustomRepository(PolicyRepository);
  }

  get sessionRepository(): SessionRepository {
    return this.connection.getCustomRepository(SessionRepository);
  }

  get tokenRepository(): TokenRepository {
    return this.connection.getCustomRepository(TokenRepository);
  }

  get templateRepository(): TemplateRepository {
    return this.connection.getCustomRepository(TemplateRepository);
  }
}
