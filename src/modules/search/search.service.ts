import { Injectable, Inject } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class SearchService {
  constructor(
    @Inject('ELASTICSEARCH') private readonly elasticSearchClient: Client,
  ) {}

  async search(index: string, query: any) {
    const { body } = await this.elasticSearchClient.search({
      index,
      body: {
        query,
        fuzziness: 'auto',
        operator: 'and',
      },
    });

    return body.hits.hits;
  }
}
