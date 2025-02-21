import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getTasks(user: User): Promise<Task[]> {
    const tasks = await this.taskRepository.findAll(user);
    if (!tasks) throw new NotFoundException('No tasks found');
    return tasks;
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    return this.taskRepository.findTaskById(id, user);
  }

  async updateTask(id: string, body: UpdateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.updateTask(id, body, user);
  }

  async deleteTask(id: string, user: User): Promise<string> {
    return await this.taskRepository.deleteTask(id, user);
  }
}
