import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Patch,
  NotFoundException,
  Delete,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login-user.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class UsersController {
  private service: UsersService;
  private authService: AuthService;
  constructor(UsersService: UsersService, AuthService: AuthService) {
    this.service = UsersService;
    this.authService = AuthService;
  }

  @Post('/sign-up')
  async create(@Body() body: CreateUserDto, @Session() session: any) {
    const { name, email, password } = body;
    const user = await this.authService.signUp(name, email, password);
    session.userId = user.id;

    return user;
  }

  @Post('/login')
  async login(@Body() body: LoginDto, @Session() session: any) {
    const { email, password } = body;
    const user = await this.authService.login(email, password);
    session.userId = user.id;

    return user;
  }

  @Post('/logout')
  async logout(@Session() session: any) {
    session.userId = null;
  }

  @Get('/')
  @UseGuards(AuthGuard)
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
}
