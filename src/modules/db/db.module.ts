import { Global, Module, OnModuleDestroy } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { configureDataSourceProvider } from './dataSource/data-source';
import { InjectDataSource } from './decorators/inject-data-source.decorator';

@Global()
@Module({})
export class DbModule implements OnModuleDestroy {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  static forRoot(dataSource: DataSource) {
    const DataSourceProvider = configureDataSourceProvider(dataSource);

    return {
      module: DbModule,
      providers: [DataSourceProvider],
      exports: [DataSourceProvider],
    };
  }

  async onModuleDestroy() {
    await this.dataSource.destroy();
  }
}
