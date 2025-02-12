import { ITaskStatus } from '../task.model';

export class UpdateTaskDto {
  title?: string;
  description?: string;
  status?: ITaskStatus;
}
