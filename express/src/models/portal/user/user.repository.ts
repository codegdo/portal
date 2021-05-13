import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
//import { selectUserQuery } from './user.query';
import { LoginUserDto, SignupUserDto } from './user.dto';
import { BadRequestError, InternalServerError } from 'routing-controllers';
import { Role } from '../role/role.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signupUser(signupUserDto: SignupUserDto, role: Role): Promise<User> {
    const { email, username, password } = signupUserDto;
    const user = new User();

    user.email = email;
    user.username = username;
    user.password = password;
    user.role = role;

    try {
      return user.save();
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new BadRequestError('User already exists');
      } else {
        throw new InternalServerError('Internal server error');
      }
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<User | null | undefined> {
    const { username, password } = loginUserDto;
    const query = this.createQueryBuilder('user');

    try {
      //await this.manager.query(`${selectUserQuery}`, [username]);
      //await this.manager.query(`CALL my_procedure($1)`, ['giangd@gmail.com']);
      //await this.manager.query(`SELECT * FROM sec_fn_login_user($1)`, [username]);

      const user = await query
        .addSelect(['user.password', 'user.salt'])
        .leftJoinAndSelect('user.role', 'role')
        .leftJoinAndSelect('role.roletype', 'roletype')
        .where('user.username = :username', { username })
        .getOne();

      if (user) {
        if (await user.validatePassword(password)) {
          return user;
        }
        return null;
      }

      return undefined;
    } catch (error) {
      console.log(error);
      throw new InternalServerError('Internal server error');
    }
  }
}
