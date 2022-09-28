import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/models/task';

/**
 * Install dependencies: npm install --save @nestjs/typeorm typeorm cockroachdb
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.db',
      entities: [Task],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
