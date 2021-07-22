import { Body, Get, JsonController, Param, Post, QueryParam, Session } from 'routing-controllers';
import { Inject } from 'typedi';
import { CreateRegistrationDto, CreateRegistrationInput } from '../../../models/sales/dtos';
import { Registration } from '../../../models/sales/entities';
import { RegistrationService } from './registration.service';

@JsonController('/sales')
export class ProgramController {
  @Inject()
  private regService!: RegistrationService;

  @Get('/registrations')
  async getAllPrograms(@QueryParam('programId') programId: number): Promise<Registration[]> {

    const registrations = await this.regService.getAllRegistrations(programId);

    return registrations;
  }

  @Get('/registrations/:regId')
  async getRegistrationById(@Param('regId') regId: number): Promise<Registration> {

    const registration = await this.regService.getRegistrationById(regId);

    return registration;
  }

  @Post('/registrations')
  async createRegistration(@Session() session: any, @Body() createRegistrationInput: CreateRegistrationInput): Promise<Registration> {

    const { userId, orgId } = session.user;
    const { programId } = createRegistrationInput;

    const createRegistrationDto: CreateRegistrationDto = {
      regNumber: 'DR123',
      programId,
      formId: 0,
      ownerId: userId,
      orgId
    };

    const registration = await this.regService.createRegistration(createRegistrationDto);

    return registration;
  }
}
