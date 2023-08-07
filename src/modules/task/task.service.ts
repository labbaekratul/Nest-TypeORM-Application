import { Injectable } from '@nestjs/common';
import { TasksRepository } from './task.repository';
import { Task, TaskStatus } from './task.entity';
import { errorHandler } from 'src/helpers/errorHandler';
import {
  CreateTaskParams,
  TaskFilterQuery,
} from 'src/interfaces/task.interface';
import { User } from '../auth/user.entity';

@Injectable()
export class TaskService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getTasks(queryParams: TaskFilterQuery, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(queryParams, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id, user } });
    if (!found) return errorHandler(404, true, id);
    return found;
  }

  createTask(taskInput: CreateTaskParams, user: User): Promise<Task> {
    return this.tasksRepository.createTask(taskInput, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) return errorHandler(404, true, id);
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
