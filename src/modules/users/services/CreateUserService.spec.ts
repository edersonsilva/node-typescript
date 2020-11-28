import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'Ederson',
      email: 'edersigner@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    // expect(user.name).toBe('Ederson');
  });

  it('should not be able to create two users on them same time', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: 'Ederson',
      email: 'edersigner@gmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Ederson',
        email: 'edersigner@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
