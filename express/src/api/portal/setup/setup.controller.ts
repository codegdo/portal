import { Get, JsonController } from "routing-controllers";

@JsonController('/setup')
export class SetupController {

  @Get('/themes')
  async themes() {

  }

}