import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report } from './report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService, UsersService],
})
export class ReportsModule {}
