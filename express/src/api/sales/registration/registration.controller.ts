import {
  Authorized,
  Body,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Post,
  QueryParam,
  Session,
} from 'routing-controllers';
import { Inject } from 'typedi';
import { User } from '../../../models/portal/entities';
import { Registration } from '../../../models/sales/entities';
import { RegistrationService } from './registration.service';
import { CreateRegInput, UserSession } from './registration.type';

@Authorized(['PROGRAM'])
@JsonController('/sales')
export class ProgramController {
  @Inject()
  private regService!: RegistrationService;

  @Get('/registrations')
  async getRegistrations(
    @CurrentUser() user: User,
    @QueryParam('programId') programId: number
  ): Promise<Registration[]> {
    const { orgId } = user;
    const registrations = await this.regService.getRegistrations({
      programId,
      orgId,
    });

    return registrations;
  }

  @Get('/registrations/:regId')
  async getRegistrationById(@Param('regId') regId: number): Promise<Registration> {
    const registration = await this.regService.getRegistrationById(regId);

    return registration;
  }

  @Post('/registrations')
  async createRegistration(
    @Session() session: UserSession,
    @Body() createRegInput: CreateRegInput
  ): Promise<Registration> {
    const { user } = session;

    const registration = await this.regService.createRegistration({
      ...createRegInput,
      ...user,
    });

    return registration;
  }
}
