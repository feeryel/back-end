import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

export class ConfigService {
  constructor() {
    dotenv.config({
      path: `.env`,
    });
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  get typeOrmConfig(): TypeOrmModule {
    /* fi 3oudh ma ynadi kol mara model ynadih mara wahda khw par exemple user (__dirname) */
    let entities: string[] = [__dirname + '../../modules/**/*.model{.ts,.js}'];
    return {
      entities,
      type: 'postgres',
      host: this.get('POSTGRES_HOST'),
      port: this.getNumber('POSTGRES_PORT'),
      username: this.get('POSTGRES_USERNAME'),
      password: this.get('POSTGRES_PASSWORD'),
      database: this.get('POSTGRES_DATABASE'),
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
