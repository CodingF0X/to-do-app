import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './DTO/create-task.dto';
import { Task } from './task.entity';
import { UpdateTaskDto } from './DTO/update-task.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async CreateTask(body: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(body, user);
  }

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
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
