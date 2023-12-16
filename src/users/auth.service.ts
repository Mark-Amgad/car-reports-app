import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  private usersService: UsersService;
  constructor(UsersService: UsersService) {
    this.usersService = UsersService;
  }

  async signUp(name: string, email: string, password: string) {
    //check that email doesn't exist
    const users = await this.usersService.getByEmail(email);
    if (users.length) {
      throw new BadRequestException('This Email already exist!');
    }

    // generate salt
    const salt = randomBytes(8).toString('hex');

    // hash password and salt together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // convert the buffer hash to string
    // join hash and salt together
    const finalHash = salt + '.' + hash.toString('hex');

    // create a new user
    const user = await this.usersService.create(name, email, finalHash);
    return user;
  }

  async login(email: string, password: string) {
    const [user]: User[] = await this.usersService.getByEmail(email);
    if (!user) {
      throw new BadRequestException("This email doesn't exist");
    }

    const [salt, storedHash] = user.password.split('.');

    // hash the input password with the used salt, which used during sign up
    let hash: string | Buffer = (await scrypt(password, salt, 32)) as Buffer;
    hash = hash.toString('hex');

    if (hash !== storedHash) {
      throw new BadRequestException('Wrong password!');
    }
    return user;
  }
}
