import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksGateway } from './tasks.gateway';
import { ClickupModule } from '@app/clickup';

@Module({
  imports: [ClickupModule],
  providers: [TasksGateway, TasksService],
})
export class TasksModule { }
