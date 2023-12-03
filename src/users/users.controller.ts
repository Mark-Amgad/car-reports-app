import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Patch,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthService } from './auth.service';

// TODO : add the endpoints : 3
@Controller('auth')
export class UsersController {
  private service: UsersService;
  private authService: AuthService;
  constructor(UsersService: UsersService, AuthService: AuthService) {
    this.service = UsersService;
    this.authService = AuthService;
  }

  @Post('/sign-up')
  create(@Body() body: CreateUserDto) {
    return this.service.create(body.name, body.email, body.password);
  }

  @Get('/')
  getAll() {
    return this.service.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    const user = await this.service.getOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Patch('/:id')
  updateOne(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.service.updateOne(id, body);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: number) {
    return this.service.removeOne(id);
  }

  @Get('/sign/test')
  async test() {
    return this.authService.signUp('markamgad6@gmail.com', '1234');
  }
}
