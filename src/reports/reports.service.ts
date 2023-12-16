import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
@Injectable()
export class ReportsService {
  // TODO : inject repository
  private repository: Repository<Report>;
  constructor(@InjectRepository(Report) ReportsRepository: Repository<Report>) {
    this.repository = ReportsRepository;
  }

  async getAll(): Promise<Report[]> {
    const reports: Report[] = await this.repository.find();
    return reports;
  }

  async create(report: CreateReportDto, user: User): Promise<Report> {
    try {
      const createdReport = this.repository.create(report);
      createdReport.user = user;

      return await this.repository.save(createdReport);
    } catch (err) {
      throw err;
    }
  }
}
