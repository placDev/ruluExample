import * as process from 'node:process';

import { DataSource, DataSourceOptions } from 'typeorm';
import {User} from "../users/models/user";

const migrationsPath =
  process.env.NODE_ENV === 'migration'
    ? ['src/modules/db/migrations/*.ts']
    : [];

const config: DataSourceOptions = {
  type: 'mysql',
  host: '185.177.216.77',
  port: 3306,
  username: 'VnkznI',
  password: 'eogPNkIVBoKpttdA',
  database: 'WNDnpyoX',
  synchronize: false,
  logging: true,
  entities: [User],
  migrations: migrationsPath,
};

export default new DataSource(config);
