import { describe, it } from 'mocha';
import { User, UserProps } from './user';
import expect from 'unexpected';

describe('User', () => {
  let props: UserProps;

  beforeEach(() => {
    props = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      createdAt: new Date(),
    };
  });
  describe('constructor', () => {
    it('should create a new User instance with the provided properties', () => {
      const user = new User(props);

      expect(user.name, 'to equal', props.name);
      expect(user.email, 'to equal', props.email);
      expect(user.password, 'to equal', props.password);
      expect(user.createdAt, 'to equal', props.createdAt);
      expect(user.id, 'to be a', 'string');
    });

    it('should use the provided id if provided', () => {
      const id = '123456789';
      const user = new User(props, id);

      expect(user.id, 'to equal', id);
    });
  });

  describe('name', () => {
    it('should set the name property', () => {
      const user = new User({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        createdAt: new Date(),
      });

      user.name = 'Jane Smith';

      expect(user.name, 'to equal', 'Jane Smith');
    });

    it('should get the name property', () => {
      const name = 'John Doe';
      const user = new User({
        name,
        email: 'john.doe@example.com',
        password: 'password123',
        createdAt: new Date(),
      });

      expect(user.name, 'to equal', name);
    });
  });

  describe('email', () => {
    it('should set the email property', () => {
      const user = new User({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });

      user.email = 'jane.smith@example.com';

      expect(user.email, 'to equal', 'jane.smith@example.com');
    });

    it('should get the email property', () => {
      const email = 'jane.smith@example.com';
      const user = new User({
        name: 'John Doe',
        email,
        password: 'password123',
        createdAt: new Date(),
      });

      expect(user.email, 'to equal', email);
    });
  });

  describe('updatedAt', () => {
    it('should get the updatedAt property', () => {
      const date = new Date();
      const user = new User({
        ...props,
        updatedAt: date,
      });

      expect(user.updatedAt, 'to equal', date);
    });
  });
});
