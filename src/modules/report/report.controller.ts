import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateReportDto } from './dto/report-create.dto';
import { UpdateReportDto } from './dto/report-update.dto';
import { ReportService } from './report.service';
import { Report } from './model/report.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '../user/model/user.model';
import { ElasticsearchService } from '../elasticsearch.service';
@Controller()
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  //   @Post method
  // create report
  // path : /create
  @Post('report/create')
  async createReport(@Body() createReportDto: CreateReportDto, user: User) {
    const creation = await this.reportService.createReport(
      createReportDto,
      user,
    );
    const elasticdto: Report = creation;
    await this.elasticsearchService.indexData('reports', elasticdto);

    if (!creation) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      });
    }
    return { creation, status: 201, message: 'Report created successfully' };
  }

  //   @get method
  // get one report
  // path : :id/report
  @Get('report/:id')
  // @UseGuards(JwtAuthGuard)
  // @SetMetadata('role', [Role.Admin])
  async getReport(@Param('id') id: string) {
    return await this.reportService.getReport(id);
  }
  //   @delete method
  // delete report
  // path : /delete
  @Delete('report/:id/delete')
  // @UseGuards(JwtAuthGuard)
  // @SetMetadata('role', [Role.Admin])
  async deleteReport(@Param('id') id: string) {
    const deleted = await this.reportService.deleteReport(id);
    return {
      deleted,
      status: 200,
      message: 'Report deleted successfully',
    };
  }

  //   @put method
  // update report
  // path : :id/update
  @Post('report/:id/update')
  async updateReport(
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto,
  ) {
    return await this.reportService.updateReport(id, updateReportDto);
  }
  //   @get method
  // get all reports
  // path : /reports
  @Get('reports')
  // @UseGuards(JwtAuthGuard)
  // @SetMetadata('role', [Role.Admin])
  async getAllReports(): Promise<Report[]> {
    return await this.reportService.getAllReports();
  }
}
