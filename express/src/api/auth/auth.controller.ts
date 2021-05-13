import {
  Body,
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
  async signupUser(@Body() signupUserDto: SignupUserDto): Promise<any> {
    const user = await this.authService.signupUser(signupUserDto);

    return { username: user.username };
  }

  @Get('/verify/:token')
  async verifyToken(@Param('token') token: string) {
    await this.authService.verifyToken(token);

    return { message: 'Verify successful' };
  }

  @Post('/configure')
  async configureUser(
    @Session() session: any,
    @Body() configureUserDto: { [key: string]: string }
  ): Promise<any> {
    await this.authService.configureUser({
      ...configureUserDto,
      username: session.user.username,
    });

    return { orgId: 1 };
  }

  @Get('/confirm/:token')
  async confirmToken() {}

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

    session.user = { ...payload.user, roleId: role.id };

    return payload;
  }

  @Get('/logout')
  async logoutUser(@Session() session: any, @Res() res: any) {
    session.destroy((error: any) => console.log(error));
    return res.clearCookie('connect.sid', { path: '/' }).status(200);
  }

  @Post('/resend')
  async resendToken(@Body() resendInput: ResendUserTokenDto): Promise<any> {
    const user = await this.authService.resendToken(resendInput);

    return user;
  }

  @Post('/recovery')
  async recoveryUser() {}
}

//activation
