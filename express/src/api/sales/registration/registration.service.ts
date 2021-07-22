import { NotFoundError } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { CreateRegistrationDto } from '../../../models/sales/dtos';
import { Registration } from '../../../models/sales/entities';
import { SalesRepository } from '../../../models/sales/repositories';

@Service()
export class RegistrationService {
  @Inject()
  private sales!: SalesRepository;

  async getAllRegistrations(orgId: number): Promise<Registration[]> {
    return this.sales.registrationRepository.getAllRegistrations(orgId);
  }

  async getRegistrationById(regId: number): Promise<Registration> {
    const registration = await this.sales.registrationRepository.getRegistrationById(regId);

    if (registration === undefined) {
      throw new NotFoundError('Not Found');
    }

    return registration
  }

  async createRegistration(createRegistrationDto: CreateRegistrationDto): Promise<Registration> {
    const registation = await this.sales.registrationRepository.createRegistration(createRegistrationDto);

    return registation;
  }

  //async updateProgram(): Promise<void> { }

  //async deleteProgram(): Promise<void> { }
}