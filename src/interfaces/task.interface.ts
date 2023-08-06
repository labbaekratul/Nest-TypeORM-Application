import { TaskStatus } from 'src/modules/task/task.entity';

export interface CreateTaskParams {
  title: string;
  description: string;
}

export interface TaskFilterQuery {
  status?: TaskStatus;
  search?: string;
}
