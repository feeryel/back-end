import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/report-create.dto';
import { UpdateReportDto } from './dto/report-update.dto';
import { Report } from './model/report.model';
import { User } from '../user/model/user.model';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly _reportRepository: Repository<Report>,
  ) {}

  // Create report
  async createReport(createReportDto: CreateReportDto, user: User) {
    const reports = await this._reportRepository.save({
      ...createReportDto,
      user,
    });
    return reports;
  }

  // Update report
  async updateReport(id: string, updateReportDto: UpdateReportDto) {
    return await this._reportRepository.update(id, updateReportDto);
  }
  // Get all reports
  async getAllReports(): Promise<Report[]> {
    return await this._reportRepository.find();
  }
  // Get one report
  async getReport(id: string) {
    return await this._reportRepository.findOne({ where: { id: id } });
  }
  // delete report
  async deleteReport(id: string) {
    return await this._reportRepository.delete(id);
  }
}
