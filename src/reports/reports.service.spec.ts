import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { Report } from './report.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockReport = {
  id: 1,
  make: 'fiat',
  model: 'Tippo',
  year: '2022',
  price: 200000,
  approved: false,
} as Report;
const ReportsRepositoryMock = {
  find: () => {
    return Promise.resolve([]);
  },
  create: () => {
    return Promise.resolve(mockReport);
  },
  save: () => {
    return Promise.resolve(mockReport);
  },
};

describe('ReportsService', () => {
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(Report),
          useValue: ReportsRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get all reports : ', () => {
    it('it should return an array of reports', async () => {
      const result = await service.getAll();
      expect(result).toEqual([]);
    });
  });

  describe('create a report : ', () => {
    it('it should return a report', async () => {
      const result = await service.create({} as Report, {} as User);
      expect(result).toBeDefined();
    });
  });
});
