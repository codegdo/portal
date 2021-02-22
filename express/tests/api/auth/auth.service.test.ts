import { AuthService } from '../../../src/api/auth/auth.service';
import { ExceptionHttp } from '../../../src/app.exception';
import { Token } from '../../../src/models/portal/entities';
import { PortalRepository } from '../../../src/models/portal/repositories';
import { JwtService } from '../../../src/services';

type PortalRepositoryMock = Partial<Record<keyof PortalRepository, jest.Mock>>;
type TokenMock = Partial<Record<keyof Token, jest.Mock>>;
type JwtServiceMock = Partial<Record<keyof JwtService, jest.Mock>>;

const portalRepositoryMock = (): PortalRepositoryMock => ({
  userRepository: jest
    .fn(() => ({
      login: jest.fn(),
    }))
    .call(this),
});

const tokenMock = (): TokenMock => {
  return {
    create: jest.fn(),
  };
};

const jwtMock = (): JwtServiceMock => {
  return {
    sign: jest.fn(),
  };
};

describe('AuthService', () => {
  let authService = new AuthService();

  beforeAll(() => {});

  beforeEach(() => {
    Object.getPrototypeOf(authService).portal = portalRepositoryMock();
    Object.getPrototypeOf(authService).jwt = jwtMock();
    Object.getPrototypeOf(authService).token = tokenMock();
  });

  describe('loginUser', () => {
    const loginInput = {
      username: '',
      password: '',
    };
    const loginOutput = {
      username: 'gdo',
      email: 'test@gmail.com',
    };

    it('should login user', async () => {
      authService['portal'].userRepository.login = jest
        .fn()
        .mockResolvedValue(loginOutput);

      authService['jwt'].sign = jest.fn().mockImplementation(() => 'token');

      const result = await authService.loginUser(loginInput);

      expect(result).toMatchObject({
        user: { username: 'gdo', email: 'test@gmail.com' },
        token: 'token',
      });
    });

    it('should fail on exception', async () => {
      authService['portal'].userRepository.login = jest.fn().mockResolvedValue(null);

      try {
        await authService.loginUser(loginInput);
      } catch (error) {
        expect(error).toStrictEqual(new ExceptionHttp(404, 'Not Found'));
      }
    });

    it('login', async () => {
      await authService['portal'].userRepository.login(loginInput);
      expect(authService['portal'].userRepository.login).toHaveBeenCalledTimes(1);
    });
  });
});
