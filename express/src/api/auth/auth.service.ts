import { InternalServerError } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { ExceptionHttp } from '../../app.exception';
import {
  LoginUserDto,
  ResendUserTokenDto,
  SignupUserDto,
  TokenDto,
} from '../../models/portal/dtos';
import { Organization, Token, TokenData, User } from '../../models/portal/entities';
import { PortalRepository } from '../../models/portal/repositories';

@Service()
export class AuthService {
  @Inject()
  private portal!: PortalRepository;

  @Inject()
  private token!: Token;

  signupUser = async (signupUserDto: SignupUserDto): Promise<User> => {
    const role = await this.portal.roleRepository.findOne(2);

    console.log(role);

    // undefined - not found
    if (role === undefined) {
      throw new ExceptionHttp(404, 'Not Found');
    }

    const user = await this.portal.userRepository.signupUser(signupUserDto, role);

    // generate token
    const tokenData: TokenData = {
      maxAge: 60 * 1000,
      data: JSON.stringify({ username: user.username }),
    };
    const tokenDto: TokenDto = this.token.create(tokenData);

    await this.portal.tokenRepository.createToken(tokenDto);

    // send mail

    return user;
  };

  configureUser = async (configureUserDto: {
    [key: string]: string;
  }): Promise<null> => {
    const { name, hostname, username } = configureUserDto;
    const owner = await this.portal.userRepository.findOne({
      where: [{ username }],
    });

    // not found
    if (!owner) return null;

    // create org
    const org = new Organization();
    org.name = name;
    org.hostname = hostname;
    org.owner = owner;

    // assign role to owner
    const role = await this.portal.roleRepository.findOne(2);

    //
    await this.portal.connection
      .transaction(async (transactionalEntityManager) => {
        const savedOrg = await transactionalEntityManager.save(org);

        owner.orgId = savedOrg.id;

        if (role) owner.role = role;

        await transactionalEntityManager.save(owner);
      })
      .catch((error) => {
        console.log(error);
        throw new InternalServerError('Internal server error');
      });

    return null;
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

  verifyToken = async (tokenId: string): Promise<boolean> => {
    const token = await this.portal.tokenRepository.findOne({
      where: [{ id: tokenId }],
    });

    // undefined - not found
    if (token === undefined) {
      throw new ExceptionHttp(404, 'Token Not Found');
    }

    const dateNow = new Date();

    // token expired
    if (token.expiresAt < Math.round(dateNow.getTime() / 1000)) {
      throw new ExceptionHttp(404, 'User Not Found');
    }

    const { username } = JSON.parse(token.data);
    const user = await this.portal.userRepository.findOne({ where: [{ username }] });

    // undefined - not found
    if (user === undefined) {
      throw new ExceptionHttp(404, 'User Not Found');
    }

    if (user.isActive) {
      return false;
    } else {
      user.isActive = true;

      await this.portal.connection
        .transaction(async (transactionalEntityManager) => {
          await transactionalEntityManager.save(user);
          await transactionalEntityManager.remove(token);
        })
        .catch((error) => {
          console.log(error);
          throw new InternalServerError('Internal server error');
        });

      return true;
    }
  };
}
