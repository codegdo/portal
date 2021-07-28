import {
  Body,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Post,
  Res,
  Session,
} from 'routing-controllers';
import { Inject } from 'typedi';

import {
  LoginUserDto,
  ResendUserTokenDto,
  SignupUserDto,
} from '../../../models/portal/dtos';
import { JwtService } from '../../../services';
import { LoginOutput } from '../../../types';
import { AuthService } from './auth.service';

@JsonController('/auth')
export class AuthController {
  @Inject()
  private authService!: AuthService;

  @Inject()
  private jwt!: JwtService;

  @Post('/signup')
  async signupUser(@Body() signupUserDto: SignupUserDto): Promise<unknown> {
    return this.authService.signupUser(signupUserDto);
  }

  @Get('/verify/:token')
  async verifyToken(@Param('token') token: string): Promise<{ message: string }> {
    await this.authService.verifyToken(token);

    return { message: 'SUCCESS' };
  }

  @Post('/setup')
  async setupUser(
    @CurrentUser() user: { [x: string]: string } | undefined,
    @Body() setupUserDto: { [key: string]: string }
  ): Promise<any> {
    return this.authService.setupUser({
      ...setupUserDto,
      user,
    });
  }

  @Post('/login')
  async loginUser(
    @Session() session: any,
    @Body() loginInput: LoginUserDto
  ): Promise<LoginOutput> {

    const { user, nav } = await this.authService.loginUser(loginInput);

    const { id, username, emailAddress, orgId, role } = user;
    const token = this.jwt.sign({ username });
    const payload = {
      user: { userId: id, username, emailAddress, roletype: role.roletype.name, isOwner: role.isOwner },
      orgId,
      token,
      nav,
    };

    // set session user cookie
    session.user = { ...payload.user, roleId: role.id, orgId };

    return payload;
  }

  @Get('/logout')
  async logoutUser(@Session() session: any, @Res() res: any): Promise<unknown> {
    if (session.user) {
      await this.authService.logoutUser(session.id);
      res.clearCookie('connect.sid', { path: '/' });
    }

    return { message: 'Logout' };
  }

  @Post('/resend')
  async resendToken(@Body() resendInput: ResendUserTokenDto): Promise<unknown> {
    await this.authService.resendToken(resendInput);

    return { message: 'SUCCESS' };
  }

  @Post('/recovery')
  async recoveryUser() { }
}

//activation
