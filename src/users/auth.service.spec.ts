import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common';

describe('AuthService : ', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>; // to allow TS to help us in typing :D

  beforeEach(async () => {
    fakeUsersService = {
      getAll: () => {
        return Promise.resolve([]);
      },
      create: (name: string, email: string, password: string) => {
        return Promise.resolve({
          id: 1,
          name: name,
          email: email,
          password: password,
        } as User);
      },
      getByEmail: (email: string) => {
        return Promise.resolve([]);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('Can create of an auth instance', () => {
    expect(service).toBeDefined();
  });

  it('SignUp: should return the same Email in the input', async () => {
    const email = 'mark@gmail.com';
    const user = await service.signUp('Mark', email, '1234');

    expect(user.email).toEqual(email);
  });

  it('SignUp: should return the same Name in the input', async () => {
    const name = 'mark';
    const user = await service.signUp('mark', 'any@gmail.com', '1234');

    expect(user.name).toEqual(name);
  });

  it('SignUp: should return differenct inputh than in the input', async () => {
    const pass = '1234';
    const user = await service.signUp('mark', 'any@gmail.com', pass);

    expect(user.password).not.toEqual(pass);
  });

  it('SignUp: the password should be hashed', async () => {
    const pass = '1234';
    const user = await service.signUp('mark', 'any@gmail.com', pass);

    const resultedPass = user.password;
    const [salt, hashedPass] = resultedPass.split('.');

    expect(salt).toBeDefined();
    expect(hashedPass).toBeDefined();
  });

  it('SignUp: Should throw error if the email is already exist', async () => {
    fakeUsersService.getByEmail = (email: string) => {
      return Promise.resolve([
        {
          id: 1,
          name: 'mark',
          email: 'mark@gmail.com',
          password: '1234',
        } as User,
      ]);
    };

    await expect(
      service.signUp('mark', 'any@gmail.com', '1234'),
    ).rejects.toThrow(BadRequestException);
  });
});
