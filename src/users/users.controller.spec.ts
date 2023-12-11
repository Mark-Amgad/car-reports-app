import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeAuthService: Partial<AuthService>;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeAuthService = {
      signUp: (name: string, email: string, password) => {
        return Promise.resolve({
          id: 1,
          name: 'mark',
          email: 'mark@gmail.com',
          password: '1234',
        } as User);
      },
      login: (email: string, password: string) => {
        return Promise.resolve({
          id: 1,
          name: 'mark',
          email: 'mark@gmail.com',
          password: '1234',
        } as User);
      },
    };

    fakeUsersService = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Sign-up', () => {});

  describe('login', () => {
    it('Should return a user and session.userId should not be null', async () => {
      const session = { userId: -10 };
      const result = await controller.login(
        { email: 'mark@gmail.com', password: '123' },
        session,
      );
      expect(session.userId).toEqual(1);
    });
  });

  describe('logout', () => {
    it('session.userId should be NULL', async () => {
      const session = { userId: 1 };
      await controller.logout(session);

      expect(session.userId).toEqual(null);
    });
  });
});
