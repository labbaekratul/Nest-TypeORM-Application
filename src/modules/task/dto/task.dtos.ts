import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { TaskStatus } from '../task.entity';

export class CreateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}
