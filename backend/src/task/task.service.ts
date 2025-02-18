import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './DTO/create-task.dto';
import { Task } from './task.entity';
import { UpdateTaskDto } from './DTO/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async CreateTask(body: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(body);
  }

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.getTasks();
  }

  async getTaskById(id: string): Promise<Task> {
    return this.taskRepository.findTaskById(id);
  }

  async updateTask(id: string, body: UpdateTaskDto): Promise<Task> {
    return this.taskRepository.updateTask(id, body);
  }

  async deleteTask(id: string): Promise<string> {
    return await this.taskRepository.deleteTask(id);
  }
}
