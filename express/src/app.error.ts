import { Request, Response } from 'express';
import { JsonController, Req, Res, All, CurrentUser } from 'routing-controllers';

@JsonController()
export class AppError {
  @All('*')
  catchAll(
    @Req() _req: Request,
    @Res() res: Response,
    @CurrentUser() error?: string
  ): { message: string; errorCode: string | undefined } {
    // 28P01 - login db username password incorrect
    // ETIMEDOUT - network security
    res.status(500);
    return { message: 'opps... system was down', errorCode: error };
  }
}
