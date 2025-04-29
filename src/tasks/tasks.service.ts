import { Injectable, Logger } from '@nestjs/common';
import { ClickupService } from '@app/clickup';

@Injectable()
export class TasksService {
  private logger = new Logger(TasksService.name);

  constructor(private readonly clickupService: ClickupService) { }

  createClickupTask(tasks: any) {
    try {
      for (const task of tasks) {

        const { title, description, cycle, quantity, type } = task;

        this.clickupService.createPersonalTask({
          title,
          description,
          cycle,
          quantity,
          type,
        });
      }


      return { success: 'Task created successfully' };
    } catch (error) {
      this.logger.error(`Error creating task: ${error}`);
    }
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all tasks`;
  }
}
