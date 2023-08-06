import { Injectable } from '@nestjs/common';
import { TasksRepository } from './task.repository';
import { Task, TaskStatus } from './task.entity';
import { errorHandler } from 'src/helpers/errorHandler';
import {
  CreateTaskParams,
  TaskFilterQuery,
} from 'src/interfaces/task.interface';

@Injectable()
export class TaskService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getTasks(queryParams: TaskFilterQuery): Promise<Task[]> {
    return this.tasksRepository.getTasks(queryParams);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    if (!found) return errorHandler(404, true, id);
    return found;
  }

  createTask(taskInput: CreateTaskParams): Promise<Task> {
    return this.tasksRepository.createTask(taskInput);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) return errorHandler(404, true, id);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
