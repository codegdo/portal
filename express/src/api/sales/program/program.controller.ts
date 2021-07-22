import { Get, JsonController, Param, QueryParam } from 'routing-controllers';
import { Inject } from 'typedi';
import { Program } from '../../../models/sales/entities';
import { ProgramService } from './program.service';

@JsonController('/sales')
export class ProgramController {
  @Inject()
  private programService!: ProgramService;

  @Get('/programs')
  async getAllPrograms(@QueryParam('orgId') orgId: number): Promise<Program[]> {

    console.log(orgId);
    const programs = await this.programService.getAllPrograms(orgId);

    return programs;
  }

  @Get('/programs/:programId')
  async getProgramById(@Param('programId') programId: number): Promise<Program | undefined> {

    const program = await this.programService.getProgramById(programId);

    return program;
  }

  //@Post('/programs')
  //async createProgram(): Promise<Program> {}
}
