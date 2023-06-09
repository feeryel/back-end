import { Injectable, Inject } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { CreateReportDto } from './report/dto/report-create.dto';
import { Report } from './report/model/report.model';
import { UpdateReportDto } from './report/dto/report-update.dto';

@Injectable()
export class ElasticsearchService {
  constructor(
    @Inject('ELASTICSEARCH') private readonly elasticSearchClient: Client,
  ) {}

  async indexData(index: string, document: Report) {
    await this.elasticSearchClient.index({
      index,
      body: document,
    });
  }

  async deleteDocumentsByQuery(id: string) {
    try {
      const response = await this.elasticSearchClient.deleteByQuery({
        index: 'reports',
        body: {
          query: {
            match: {
              id: id,
            },
          },
        },
        refresh: true,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async updateDocumentsByQuery(id: string, updateReportDto: UpdateReportDto) {
    try {
      const response = await this.elasticSearchClient.updateByQuery({
        index: 'reports',
        body: {
          query: {
            match: {
              id: id,
            },
          },
          script: {
            source: `ctx._source.status = params.status`,
            lang: 'painless',
            params: {
              status: updateReportDto.status,
            },
          },
        },
        refresh: true,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
