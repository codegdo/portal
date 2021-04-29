import { Inject, Service } from 'typedi';
import { ExceptionHttp } from '../../app.exception';
import {
  LoginUserDto,
  ResendUserTokenDto,
  SignupUserDto,
  TokenDto,
} from '../../models/portal/dtos';
import { Token, TokenData, User } from '../../models/portal/entities';
import { PortalRepository } from '../../models/portal/repositories';

@Service()
export class AuthService {
  @Inject()
  private portal!: PortalRepository;

  @Inject()
  private token!: Token;

  signupUser = async (signupUserDto: SignupUserDto): Promise<User> => {
    const user = await this.portal.userRepository.signupUser(signupUserDto);

    // generate token
    const tokenData: TokenData = {
      maxAge: 60 * 1000,
      data: JSON.stringify({ username: user.username }),
    };
    const tokenDto: TokenDto = await this.token.create(tokenData);

    await this.portal.tokenRepository.createToken(tokenDto);

    // send mail

    return user;
  };

  loginUser = async (loginUserDto: LoginUserDto): Promise<User> => {
    const user = await this.portal.userRepository.loginUser(loginUserDto);

    // undefined - not found
    if (user === undefined) {
      throw new ExceptionHttp(404, 'Not Found');
    }

    // null - incorrect password
    if (user === null) {
      throw new ExceptionHttp(400, 'Invalid credentials');
    }

    // not activated
    if (user.isActive === false) {
      throw new ExceptionHttp(403, 'Unactivated account');
    }

    return user;
  };

  recoveryUser = async () => {
    return 'hello';
  };

  confirmToken = async () => {
    return 'hello';
  };

  resendToken = async ({
    username,
  }: ResendUserTokenDto): Promise<User | undefined> => {
    const user = await this.portal.userRepository.findOne({ where: [{ username }] });

    // undefined - not found
    if (user === undefined) {
      throw new ExceptionHttp(404, 'Not Found');
    }

    return user;
  };
}
