import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { LoginUserDto, SignupUserDto } from './user.dto';
import { ExceptionHttp } from '../../../app.exception';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(signupUserDto: SignupUserDto): Promise<User> {
    const { email, username, password } = signupUserDto;
    const user = new User();

    user.email = email;
    user.username = username;
    user.password = password;

    try {
      await user.save();
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ExceptionHttp(400, 'User already exists');
      } else {
        throw new ExceptionHttp(500);
      }
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<User | null | undefined> {
    const { username, password } = loginUserDto;
    const query = this.createQueryBuilder('user');

    try {
      const user = await query
        .addSelect(['user.password', 'user.salt'])
        .leftJoinAndSelect('user.role', 'role')
        .leftJoinAndSelect('role.roleType', 'roleType')
        .where('user.username = :username', { username })
        .getOne();

      if (user) {
        if (await user.validatePassword(password)) {
          return user;
        }
        //throw new ExceptionHttp(400, 'Invalid credentials');
        return undefined;
      }
      // throw new ExceptionHttp(404, 'Not Found');
      return null;
    } catch (error) {
      throw new ExceptionHttp(500);
    }
  }
}
