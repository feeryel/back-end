import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared.module';
import { ConfigService } from './shared/config.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { ContactModule } from './modules/contact/contact.module';
import { ReportModule } from './modules/report/report.module';
import { Client } from '@elastic/elasticsearch';
import { RolesGuard } from './auth/roles.guard.';
import { APP_GUARD } from '@nestjs/core';


const elasticSearchClient = new Client({ node: 'http://localhost:9200' });
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (config: ConfigService) => config.typeOrmConfig,
      inject: [ConfigService],
    }),
    UserModule,
    PostModule,
    AuthModule,
    ContactModule,
    ReportModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: 'ELASTICSEARCH',
      useValue: elasticSearchClient,
    },
  ],
})
export class AppModule {}
