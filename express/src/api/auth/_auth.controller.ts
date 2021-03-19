import { Request, Response } from 'express';
import { Container, Inject, Service } from 'typedi';
import { LoginUserDto, SignupUserDto } from '../../models/portal/dtos';
import { JwtService } from '../../services';

import { AuthService } from './auth.service';

@Service()
class AuthController {
  @Inject()
  private authService!: AuthService;

  @Inject()
  private jwt!: JwtService;

  loginUser = async (req: Request, res: Response): Promise<Response> => {
    const input: LoginUserDto = req.body;
    const user = await this.authService.loginUser(input);
    const { username, email } = user;
    const token = this.jwt.sign({ username });
    const payload = { user: { username, email }, token };

    req.session.user = { username, email };
    res.set({ Authorization: 'Bear ' + token });

    return res.json(payload);
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
