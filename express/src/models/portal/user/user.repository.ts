import { EntityRepository, Repository } from 'typeorm';
import { BadRequestError, InternalServerError } from 'routing-controllers';
import { User } from './user.entity';
import { Role } from '../role/role.entity';
import { LoginUserDto, SignupUserDto } from './user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signupUser({ email, username, password }: SignupUserDto): Promise<User> {
    const role = new Role();
    const user = new User();

    role.id = 2;
    user.email = email;
    user.username = username;
    user.password = password;
    user.role = role;

    try {
      return user.save();

      /* return await this.manager.query(`SELECT sec_fn_signupuser($1, $2, $3, $4, $5)`, [
        email,
        username,
        password,
        salt,
        2,
      ]); */
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
      //await this.manager.query(`SELECT * FROM sec_fn_loginuser($1)`, [username]);

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

  getUser({ email, username, password }: SignupUserDto): User {
    const role = new Role();
    const user = new User();

    role.id = 2;
    user.email = email;
    user.username = username;
    user.password = password;
    user.role = role;

    return user;
  }
}
