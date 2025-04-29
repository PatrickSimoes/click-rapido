import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ClickupService } from '@app/clickup';

@Module({
  controllers: [TasksController],
  providers: [TasksService, ClickupService],
})
export class TasksModule {}
