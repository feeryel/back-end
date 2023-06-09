import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/report-create.dto';
import { UpdateReportDto } from './dto/report-update.dto';
import { Report } from './model/report.model';
import { User } from '../user/model/user.model';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Client } from '@elastic/elasticsearch';
import { ElasticsearchService } from '../elasticsearch.service';

@Injectable()
export class ReportService {
  constructor(
    @Inject(ElasticsearchService)
    private readonly elasticsearchService: ElasticsearchService,

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
    const update = await this._reportRepository.update(id, updateReportDto);
    await this.elasticsearchService.updateDocumentsByQuery(id, updateReportDto);
    return update;
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
    const deleted = await this._reportRepository.delete(id);
    await this.elasticsearchService.deleteDocumentsByQuery(id);
    return deleted;
  }
}
