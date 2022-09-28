import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    AppController,
    TaskController
  ],
  providers: [
    AppService,
    TaskService,
  ],
})
export class AppModule {}
