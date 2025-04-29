import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post('create-clickup-task')
  create(@Body() body: any) {
    return this.tasksService.createClickupTask(body);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }
}
