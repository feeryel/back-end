import { Module } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Module({
  providers: [
    {
      provide: 'ELASTICSEARCH',
      useValue: new Client({ node: 'http://localhost:9200' }),
    },
  ],
  exports: ['ELASTICSEARCH'],
})
export class ElasticsearchModule {}
