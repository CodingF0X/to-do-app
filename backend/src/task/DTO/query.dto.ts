import { ITaskStatus } from '../task.model';

export class QueryDto {
  searchTerm: string;
  status: ITaskStatus;
}
