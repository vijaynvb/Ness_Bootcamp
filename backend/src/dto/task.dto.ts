import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { TaskPriority, TaskStatus } from '../domain/task.entity';

export class CreateTaskRequestDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsEnum(TaskPriority)
  priority!: TaskPriority;

  @IsDateString()
  dueDate!: string;

  @IsEnum(TaskStatus)
  status!: TaskStatus;

  @IsOptional()
  @IsString()
  assigneeId?: string | null;
}

export class UpdateTaskRequestDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  assigneeId?: string | null;
}
