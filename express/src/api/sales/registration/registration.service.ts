import { NotFoundError } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { CreateRegDto, GetRegDto } from '../../../models/sales/dtos';
import { Registration } from '../../../models/sales/entities';
import { SalesRepository } from '../../../models/sales/repositories';
import { CreateRegInput } from './registration.type';

@Service()
export class RegistrationService {
  @Inject()
  private sales!: SalesRepository;

  async getRegPrefix(
    programId: number
  ): Promise<{ regPrefix: string; formId: number }> {
    const program = await this.sales.programRepository.getProgramById(programId);

    if (!program) {
      throw new NotFoundError('Not Found');
    }

    return {
      regPrefix: `${program.regPrefix}${program.id}`,
      formId: program.formId,
    };
  }

  async getRegistrations(getRegDto: GetRegDto): Promise<Registration[]> {
    return this.sales.registrationRepository.getRegistrations(getRegDto);
  }

  async getRegistrationById(regId: number): Promise<Registration> {
    const registration = await this.sales.registrationRepository.getRegistrationById(
      regId
    );

    if (!registration) {
      throw new NotFoundError('Not Found');
    }

    return registration;
  }

  async createRegistration(createRegInput: CreateRegInput): Promise<Registration> {
    const { programId, userId, orgId, username } = createRegInput;
    const { regPrefix, formId } = await this.getRegPrefix(programId);

    const createRegDto: CreateRegDto = {
      programId,
      formId,
      orgId,
      regNumber: regPrefix,
      ownerId: userId,
      createdBy: username,
      updatedBy: username,
    };

    const registation = await this.sales.registrationRepository.createRegistration(
      createRegDto
    );

    return registation;
  }

  //async updateProgram(): Promise<void> { }

  //async deleteProgram(): Promise<void> { }
}
