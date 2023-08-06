import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskStatusDto } from './dto/task.dtos';
import { TaskFilterDto } from './dto/task-filter.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(@Query() queryParams: TaskFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(queryParams);
  }

  @Get(':id')
  getTaskById(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskBody: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskBody);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskBody: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskBody;
    return this.taskService.updateTaskStatus(id, status);
  }
}
