import { UserProps, User } from '../../src/application/entities/user';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  return {
    name: 'John Doe',
    email: 'user@example.com',
    password: '12345',
    createdAt: new Date(),
    ...override,
  };
}

export function makeUserEntity() {
  const user = makeUser();

  return new User(user);
}
