// TODO :
// inject auth service to the module
// sign up and login methods
// Hash password using crypto and salt

import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  private usersService: UsersService;
  constructor(UsersService: UsersService) {
    this.usersService = UsersService;
  }

  async signUp(email: string, password: string) {
    //check that email doesn't exist
    const users = await this.usersService.getByEmail(email);
    if (users.length) {
      throw new BadRequestException('This Email already exist!');
    }

    // generate salt
    const salt = randomBytes(8).toString('hex');

    // hash password and salt together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    console.log(hash);
    // convert the buffer hash to string

    // join hash and salt together

    // create a new user
  }
}
