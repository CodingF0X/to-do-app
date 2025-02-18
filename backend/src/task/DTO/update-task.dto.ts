import { TaskStatus } from '../task-status.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: ' status should be either DONE , IN_PROGRESS  or OPEN ',
  })
  status: TaskStatus;
}
