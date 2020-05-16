import { EntityRepository, Repository } from 'typeorm';

import User from '../models/user';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByDate(date: Date): Promise<User | null> {
    const findUser = await this.findOne({
      where: { date },
    });

    return findUser || null;
  }
}

export default UsersRepository;
