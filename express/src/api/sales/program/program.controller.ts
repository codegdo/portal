import {
  Authorized,
  CurrentUser,
  Get,
  JsonController,
  Param,
} from 'routing-controllers';
import { Inject } from 'typedi';
import { User } from '../../../models/portal/entities';
import { Program } from '../../../models/sales/entities';
import { ProgramService } from './program.service';

@Authorized(['PROGRAM'])
@JsonController('/sales')
export class ProgramController {
  @Inject()
  private programService!: ProgramService;

  @Get('/programs')
  async getPrograms(@CurrentUser() user: User): Promise<Program[]> {
    const { orgId } = user;
    const programs = await this.programService.getPrograms(orgId);

    return programs;
  }

  @Get('/programs/:programId')
  async getProgramById(
    @Param('programId') programId: number
  ): Promise<Program | undefined> {
    const program = await this.programService.getProgramById(programId);

    return program;
  }

  //@Post('/programs')
  //async createProgram(): Promise<Program> {}
}
