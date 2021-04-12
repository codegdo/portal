import { Body, Get, JsonController, Post, Res, Session } from 'routing-controllers';
import { Inject } from 'typedi';

import { LoginUserDto, SignupUserDto } from '../../models/portal/dtos';
import { JwtService } from '../../services';
import { LoginOutput } from '../../types';
import { AuthService } from './auth.service';

@JsonController('/auth')
export class AuthController {
  @Inject()
  private authService!: AuthService;

  @Inject()
  private jwt!: JwtService;

  @Post('/signup')
  async signupUser(@Body() input: SignupUserDto): Promise<any> {
    const user = await this.authService.signupUser(input);

    return { username: user.username };
  }

  @Get('/confirm/:token')
  async confirmToken() {}

  @Post('/resend')
  async resendToken() {
    throw new Error();
    //return { message: 'successful' };
  }

  @Post('/login')
  async loginUser(
    @Session() session: any,
    @Body() loginInput: LoginUserDto
  ): Promise<LoginOutput> {
    const user = await this.authService.loginUser(loginInput);

    const { username, email } = user;
    const token = this.jwt.sign({ username });
    const payload = { user: { username, email }, token };

    session.user = { username, email };
    return payload;
  }

  @Get('/logout')
  async logoutUser(@Session() session: any, @Res() res: any) {
    session.destroy((error: any) => console.log(error));
    return res.clearCookie('connect.sid', { path: '/' }).status(200).send('ok.');
  }

  @Post('/recovery')
  async recoveryUser() {}
}

//activation
