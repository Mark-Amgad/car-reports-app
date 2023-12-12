import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
@Injectable()
export class ReportsService {
  // TODO : inject repository
  private repository: Repository<Report>;
  constructor(@InjectRepository(Report) ReportRepository: Repository<Report>) {
    this.repository = ReportRepository;
  }

  async getAll(): Promise<Report[]> {
    const reports: Report[] = await this.repository.find();
    return reports;
  }

  async;
  // TODO : write suitable services
}
