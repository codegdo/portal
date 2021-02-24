import { Inject, Service } from 'typedi';
import { ExceptionHttp } from '../../app.exception';
import { LoginUserDto, SignupUserDto, TokenDto } from '../../models/portal/dtos';
import { Token, TokenData } from '../../models/portal/entities';
import { PortalRepository } from '../../models/portal/repositories';
import { JwtService } from '../../services';
import { LoginOutput } from '../../types';

@Service()
export class AuthService {
  @Inject()
  private portal!: PortalRepository;

  @Inject()
  private token!: Token;

  @Inject()
  private jwt!: JwtService;

  signupUser = async (signupUserDto: SignupUserDto): Promise<void> => {
    const user = await this.portal.userRepository.signup(signupUserDto);

    // generate token
    const tokenData: TokenData = {
      maxAge: 60 * 1000,
      data: JSON.stringify({ username: user.username }),
    };
    const tokenDto: TokenDto = await this.token.create(tokenData);

    await this.portal.tokenRepository.createToken(tokenDto);

    // send mail
  };

  loginUser = async (loginUserDto: LoginUserDto): Promise<LoginOutput> => {
    try {
      const user = await this.portal.userRepository.login(loginUserDto);

      if (!user) {
        if (user === null) {
          throw new ExceptionHttp(404, 'Not Found');
        }
        throw new ExceptionHttp(400, 'Invalid credentials');
      }

      const { username, email } = user;
      const token = this.jwt.sign({ username });

      return { user: { username, email }, token };
    } catch (error) {
      throw error;
    }
  };

  recoveryUser = async () => {
    return 'hello';
  };

  verifyUser = async () => {
    return 'hello';
  };
}
