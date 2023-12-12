import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';

// TODO : add the endpoints : 3
@Controller('reports')
export class ReportsController {
  private reportsService: ReportsService;

  constructor(ReportsService: ReportsService) {
    this.reportsService = ReportsService;
  }

  @Get('/')
  async getAll() {
    return await this.reportsService.getAll();
  }
}
