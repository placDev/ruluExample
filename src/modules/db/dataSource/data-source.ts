import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

export function configureDataSourceProvider(dataSource: DataSource): Provider {
  return {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      await dataSource.initialize();
      return dataSource;
    },
  };
}
