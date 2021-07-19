import { Service } from 'typedi';
import { Connection, getConnection } from 'typeorm';

import { ProgramRepository } from './program/program.repository';
import { RegistrationRepository } from './registration/registration.repository';

@Service()
export class SalesRepository {
  get connection(): Connection {
    return getConnection('sales');
  }

  // dbo

  // org
  get programRepository(): ProgramRepository {
    return this.connection.getCustomRepository(ProgramRepository);
  }

  get registrationRepository(): RegistrationRepository {
    return this.connection.getCustomRepository(RegistrationRepository);
  }

  // sec
}
