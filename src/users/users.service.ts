import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  private repo: Repository<User>;
  constructor(@InjectRepository(User) UserRepository: Repository<User>) {
    this.repo = UserRepository;
  }
  create(name: string, email: string, password: string) {
    const user = this.repo.create({
      name: name,
      email: email,
      password: password,
    });

    return this.repo.save(user);
  }

  getAll() {
    return this.repo.find();
  }

  async getOne(id: number) {
    return (await this.repo.find({ where: { id: id } }))[0];
  }

  async getByEmail(email: string) {
    return await this.repo.find({ where: { email: email } });
  }

  async updateOne(id: number, attrs: Partial<User>) {
    const user = (await this.repo.find({ where: { id: id } }))[0];
    if (!user) {
      throw new NotFoundException('user not found');
    }
    console.log(user);
    Object.assign(user, attrs);
    console.log(user);
    return this.repo.save(user);
  }

  async removeOne(id: number) {
    const user = (await this.repo.find({ where: { id: id } }))[0];

    if (!user) {
      throw new NotFoundException('not found user');
    }

    return this.repo.remove(user);
  }
}
