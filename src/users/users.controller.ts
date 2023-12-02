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

// TODO : add the endpoints : 3
@Controller('auth')
export class UsersController {
  private service: UsersService;
  constructor(UsersService: UsersService) {
    this.service = UsersService;
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
}
