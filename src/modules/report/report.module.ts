import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './model/report.model';
import { SearchModule } from './../search/search.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), SearchModule],
  providers: [ReportService],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule {}
