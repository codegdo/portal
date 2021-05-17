import { InternalServerError } from 'routing-controllers';
import { EntityRepository, Repository } from 'typeorm';
import { Session } from './session.entity';

@EntityRepository(Session)
export class SessionRepository extends Repository<Session> {
  async clearSession(id: string): Promise<void> {
    try {
      const dateNow = new Date().getTime();

      await this.manager.query(
        `DELETE FROM sec.session WHERE id = $1 OR expired_at < $2`,
        [id, dateNow]
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerError('Internal server error');
    }
  }
}
