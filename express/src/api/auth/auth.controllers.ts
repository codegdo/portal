import { Body, Get, JsonController, Post } from 'routing-controllers';
import { Inject } from 'typedi';

import { LoginUserDto, SignupUserDto } from '../../models/portal/dtos';
import { LoginOutput } from '../../types';
import { AuthService } from './auth.service';

@JsonController('/auth')
export class AuthControllers {
  @Inject()
  private authService!: AuthService;

  @Post('/signup')
  async signupUser(@Body() input: SignupUserDto): Promise<any> {
    await this.authService.signupUser(input);
    return { ok: true };
  }

  @Get('/verify/:token')
  async verifyToken() {}

  @Post('/verify')
  async verifyUser() {}

  @Post('/login')
  async loginUser(@Body() input: LoginUserDto): Promise<LoginOutput> {
    const output = await this.authService.loginUser(input);
    return output;
  }

  @Post('/recovery')
  async recoveryUser() {}
}
