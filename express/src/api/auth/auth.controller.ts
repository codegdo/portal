import { Request, Response } from 'express';
import { Container, Inject, Service } from 'typedi';
import { LoginUserDto, SignupUserDto } from '../../models/portal/dtos';

import { AuthService } from './auth.service';

@Service()
class AuthController {
  @Inject()
  private authService!: AuthService;

  loginUser = async (req: Request, res: Response): Promise<Response> => {
    const loginUserDto: LoginUserDto = req.body;
    const loginOutput = await this.authService.loginUser(loginUserDto);

    return res.json(loginOutput);
  };

  signupUser = async (req: Request, res: Response): Promise<Response> => {
    const singupUserDto: SignupUserDto = req.body;
    await this.authService.signupUser(singupUserDto);
    return res.json({ ok: true });
  };

  recoveryUser = async (_req: Request, res: Response): Promise<Response> => {
    return res.json({ ok: true });
  };

  verifyUser = async (_req: Request, res: Response): Promise<Response> => {
    return res.json({ ok: true });
  };

  validateUser = async (_req: Request, res: Response): Promise<Response> => {
    return res.json({ ok: true });
  };
}

export const {
  loginUser,
  signupUser,
  recoveryUser,
  verifyUser,
  validateUser,
} = Container.get(AuthController);
