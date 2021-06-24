import { InternalServerError } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { ExceptionHttp } from '../../app.exception';
import { format } from 'date-fns';
import {
  LoginUserDto,
  ResendUserTokenDto,
  SignupUserDto,
  TokenDto,
} from '../../models/portal/dtos';
import { Organization, Role, Token, User } from '../../models/portal/entities';
import { PortalRepository } from '../../models/portal/repositories';
import { MailService } from '../../services';
import { httpHost, dateStyle } from '../../configs';

@Service()
export class AuthService {
  @Inject()
  private portal!: PortalRepository;

  @Inject()
  private mailer!: MailService;

  @Inject()
  private token!: Token;

  private async createTemplate(orgId: number) {
    const list = await this.portal.templateRepository.find({
      where: [{ orgId: null }],
    });

    const templates = list.reduce((array, item): any => {
      const { id, ...rest } = item;
      return [...array, { ...rest, orgId }];
    }, []);

    return this.portal.templateRepository.create(templates);
  }

  private async createSubscription(orgId: number, modules: string) {
    const list = await this.portal.moduleRepository.find({
      where: [{ isSubscription: true }],
    });

    const date = new Date();
    const trial30days = date.setDate(date.getDate() + 30);

    const subs = list.reduce((array, item): any => {
      const checked = modules.indexOf(`${item.id}`) !== -1;
      const sub = {
        module: item.id,
        orgId,
        plan: checked ? 2 : null,
        isRenewed: false,
        isTrial: checked ? true : false,
        endDate: checked
          ? format(trial30days, dateStyle)
          : format(Date.now(), dateStyle),
      };
      return [...array, { ...sub }];
    }, []);

    return this.portal.subscriptionRepository.create(subs);
  }

  private async getNav(orgId: number | null, rolename: string) {
    if (orgId) {
      const modules = await this.portal.moduleRepository.getModuleByUser(
        orgId,
        rolename
      );

      console.log('GET NAV', modules);

      return modules;
    }

    return null;
  }

  signupUser = async (
    signupUserDto: SignupUserDto
  ): Promise<{ username: string }> => {
    const { username } = signupUserDto;
    const user = this.portal.userRepository.getUser(signupUserDto);

    // generate token
    const tokenDto: TokenDto = this.token.create({
      maxAge: 60 * 1000,
      json: JSON.stringify({ username }),
    });

    const token = this.portal.tokenRepository.getToken(tokenDto);

    await this.portal.connection
      .transaction(async (manager) => {
        await manager.save(user);
        await manager.save(token);
      })
      .catch((error) => {
        console.log(error);
        throw new InternalServerError('Internal server error');
      });

    // send mail
    await this.mailer.send({
      from: 'giangd@gmail.com',
      to: `${user.email}`,
      subject: 'Activate',
      html: `<a href="${httpHost}/auth/verify/${token.id}">Activate</a>`,
    });

    return { username };
  };

  setupUser = async (setupUserDto: any): Promise<any> => {
    const { name, hostname, modules, user } = setupUserDto;

    // session user
    if (!user) {
      throw new ExceptionHttp(404, 'Not Found');
    }

    const owner = await this.portal.userRepository.findOne({
      where: [{ username: user.username }],
    });

    // not found
    if (owner === undefined) {
      throw new ExceptionHttp(404, 'Not Found');
    }

    // create org
    const org = new Organization();
    org.name = name;
    org.hostname = hostname;
    org.owner = owner;

    // assign role to owner
    const role = new Role();
    role.id = 2;

    //
    const result = await this.portal.connection
      .transaction(async (manager) => {
        const { id: orgId } = await manager.save(org);

        owner.orgId = orgId;
        owner.role = role;

        const templates = await this.createTemplate(orgId);
        const subs = await this.createSubscription(orgId, modules);

        await manager.save(templates);
        await manager.save(subs);
        await manager.save(owner);

        return { orgId, templates };
      })
      .catch((error) => {
        console.log(error);
        throw new InternalServerError('Internal server error');
      });

    const nav = await this.getNav(result.orgId, 'internal');

    return { ...result, nav };
  };

  loginUser = async (
    loginUserDto: LoginUserDto
  ): Promise<{ user: User; nav: any }> => {
    const user = await this.portal.userRepository.loginUser(loginUserDto);

    // undefined - not found
    if (user === undefined) {
      throw new ExceptionHttp(404, 'Not Found');
    }

    // null - incorrect password
    if (user === null) {
      throw new ExceptionHttp(400, 'Invalid Credentials');
    }

    // not activated
    if (user.isActive === false) {
      throw new ExceptionHttp(403, 'Unactivated Account');
    }

    //
    const {
      orgId,
      role: { roletype },
    } = user;

    const nav = await this.getNav(orgId, roletype.name);

    return { user, nav };
  };

  logoutUser = async (id: string): Promise<void> => {
    await this.portal.sessionRepository.clearSession(id);
  };

  recoveryUser = async () => {
    return 'hello';
  };

  confirmToken = async () => {
    return 'hello';
  };

  resendToken = async ({ username }: ResendUserTokenDto): Promise<void> => {
    const user = await this.portal.userRepository.findOne({ where: [{ username }] });

    // not found
    if (user === undefined) {
      throw new ExceptionHttp(404, 'Not Found');
    }

    // already activated
    if (user.isActive) {
      throw new ExceptionHttp(403, 'Already Activated');
    }

    // generate token
    const tokenDto: TokenDto = this.token.create({
      maxAge: 60 * 1000,
      json: JSON.stringify({ username }),
    });

    const token = await this.portal.tokenRepository.createToken(tokenDto);

    // get email template

    // send mail
    await this.mailer.send({
      from: 'giangd@gmail.com',
      to: `${user.email}`,
      subject: 'Activate',
      html: `<a href="${httpHost}/auth/verify/${token.id}">Activate</a>`,
    });
  };

  verifyToken = async (tokenId: string): Promise<void> => {
    const token = await this.portal.tokenRepository.findOne({
      where: [{ id: tokenId }],
    });

    // token - not found
    if (token === undefined) {
      throw new ExceptionHttp(404, 'Token Not Found');
    }

    const date = new Date();
    const dateNow = Math.round(date.getTime() / 1000);

    // token - expired
    if (token.expiredAt < dateNow) {
      throw new ExceptionHttp(404, 'Token Expired');
    }

    const { username } = JSON.parse(token.json);
    const user = await this.portal.userRepository.findOne({ where: [{ username }] });

    // user - not found
    if (user === undefined) {
      throw new ExceptionHttp(404, 'User Not Found');
    }

    // check - is user active
    if (user.isActive) {
      throw new ExceptionHttp(404, 'Token Activated');
    } else {
      user.isActive = true;

      await this.portal.connection
        .transaction(async (manager) => {
          await manager.save(user);
          // clean up tokens
          await manager.query(
            `DELETE FROM sec.token WHERE id = $1 OR expired_at < $2`,
            [token.id, dateNow]
          );
        })
        .catch((error) => {
          console.log(error);
          throw new InternalServerError('Internal server error');
        });
    }
  };
}
