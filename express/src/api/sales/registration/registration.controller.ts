import { Body, Get, JsonController, Param, Post, QueryParam, Session } from 'routing-controllers';
import { Inject } from 'typedi';
import { Registration } from '../../../models/sales/entities';
import { RegistrationService } from './registration.service';
import { CreateRegInput, UserSession } from './registration.type';

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
  async createRegistration(@Session() session: UserSession, @Body() createRegInput: CreateRegInput): Promise<Registration> {

    const { user } = session;

    const registration = await this.regService.createRegistration({ ...createRegInput, ...user });

    return registration;
  }
}
