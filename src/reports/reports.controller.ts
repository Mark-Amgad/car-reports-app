import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reports')
export class ReportsController {
  private reportsService: ReportsService;
  private usersService: UsersService;

  constructor(ReportsService: ReportsService, UsersService: UsersService) {
    this.reportsService = ReportsService;
    this.usersService = UsersService;
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getAll() {
    return await this.reportsService.getAll();
  }

  @Post('/')
  @UseGuards(AuthGuard)
  async create(@Body() body: CreateReportDto, @Session() session) {
    const reportData: CreateReportDto = body;
    const currentUser: User = await this.usersService.getOne(session.userId);
    if (!currentUser) {
      throw new UnauthorizedException('Please login first');
    }
    return await this.reportsService.create(reportData, currentUser);
  }
}
