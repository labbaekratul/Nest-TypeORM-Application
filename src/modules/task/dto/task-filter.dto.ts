import { TaskStatus } from '../task.entity';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class TaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsString()
  search: string;
}
