import { Service } from 'typedi';
import { Connection, getConnection } from 'typeorm';

import { ModuleRepository } from './module/module.repository';
import { UserRepository } from './user/user.repository';
import { SessionRepository } from './session/session.repository';
import { TokenRepository } from './token/token.repository';
import { TemplateRepository } from './template/template.repository';
import { OrganizationRepository } from './organization/organization.repository';
import { RoleRepository } from './role/role.repository';
import { PolicyRepository } from './policy/policy.repository';
import { SubscriptionRepository } from './subscription/subscription.repository';
import { TerritoryRepository } from './territory/territory.repository';
import { AssignmentRepository } from './assignment/assignment.repository';

@Service()
export class PortalRepository {
  get connection(): Connection {
    return getConnection('default');
  }

  // dbo
  get moduleRepository(): ModuleRepository {
    return this.connection.getCustomRepository(ModuleRepository);
  }

  // org

  get templateRepository(): TemplateRepository {
    return this.connection.getCustomRepository(TemplateRepository);
  }

  get subscriptionRepository(): SubscriptionRepository {
    return this.connection.getCustomRepository(SubscriptionRepository);
  }

  get territoryRepository(): TerritoryRepository {
    return this.connection.getCustomRepository(TerritoryRepository);
  }

  get assignmentRepository(): AssignmentRepository {
    return this.connection.getCustomRepository(AssignmentRepository);
  }

  // sec
  get userRepository(): UserRepository {
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
}
