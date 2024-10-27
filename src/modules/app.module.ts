import { Module } from '@nestjs/common';
import {UsersModule} from "./users/users.module";
import {DbModule} from "./db/db.module";
import config from './db/ormconfig';

@Module({
  imports: [
      UsersModule,
      DbModule.forRoot(config),
  ],
})
export class AppModule {}
