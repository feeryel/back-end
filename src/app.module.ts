import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared.module';
import { ConfigService } from './shared/config.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { ContactModule } from './modules/contact/contact.module';
import { ReportModule } from './modules/report/report.module';

import { RolesGuard } from './auth/roles.guard.';
import { APP_GUARD } from '@nestjs/core';
import { SearchModule } from './modules/search/search.module';

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
    SearchModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
