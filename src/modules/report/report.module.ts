import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './model/report.model';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ElasticsearchService } from '../elasticsearch.service';
import { ElasticsearchModule } from '../search/search.module';
import { SearchService } from '../search/search.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), ElasticsearchModule],
  providers: [ReportService, ElasticsearchService, SearchService, EventEmitter2],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule {}
