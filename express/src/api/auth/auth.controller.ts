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
} from '../../models/portal/dtos';
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
  async signupUser(@Body() signupUserDto: SignupUserDto): Promise<unknown> {
    return this.authService.signupUser(signupUserDto);
  }

  @Get('/verify/:token')
  async verifyToken(@Param('token') token: string): Promise<{ message: string }> {
    await this.authService.verifyToken(token);

    return { message: 'SUCCESS' };
  }

  @Post('/configure')
  async configureUser(
    @CurrentUser() user: { [x: string]: string } | undefined,
    @Body() configureUserDto: { [key: string]: string }
  ): Promise<any> {
    console.log('CONFIGURE SESSION USER', user);
    console.log('CONFIGURE USER DTO', configureUserDto);

    /*await this.authService.configureUser({
      ...configureUserDto,
      user
    });*/

    return { orgId: 1 };
  }

  @Post('/login')
  async loginUser(
    @Session() session: any,
    @Body() loginInput: LoginUserDto
  ): Promise<LoginOutput> {
    const user = await this.authService.loginUser(loginInput);

    const { username, email, orgId, role } = user;
    const token = this.jwt.sign({ username });
    const payload = {
      user: { username, email, roletype: role.roletype.name, isOwner: role.isOwner },
      orgId,
      token,
    };

    // set session user cookie
    session.user = { ...payload.user, roleId: role.id };

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
  async recoveryUser() {}
}

//activation
