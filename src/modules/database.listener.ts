import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class DatabaseListener implements OnModuleInit {
  constructor(
    @Inject('ELASTICSEARCH') private readonly elasticSearchClient: Client,
  ) {}

  onModuleInit() {
    // Subscribe to PostgreSQL database events (e.g., record created or updated)
    // When a relevant event occurs, call this.indexData() from the ElasticsearchService
  }

  async indexData(index: string, document: any) {
    await this.elasticSearchClient.index({
      index,
      body: document,
    });
  }
}
