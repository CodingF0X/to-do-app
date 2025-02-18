import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './DTO/create-task.dto';
import { Task } from './task.entity';
import { DataSource, Repository } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { UpdateTaskDto } from './DTO/update-task.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(body: CreateTaskDto): Promise<Task> {
    const task = this.create({ ...body, status: TaskStatus.DONE });
    await this.save(task);

    return task;
  }

  async getTasks(): Promise<Task[]> {
    const tasks = await this.find();

    return tasks;
  }

  async findTaskById(id: string): Promise<Task> {
    const task = await this.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID: ${id} not found.`);
    }

    return task;
  }

  async updateTask(id: string, body: UpdateTaskDto): Promise<Task> {
    const task = await this.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID: ${id} not found.`);
    }
    const updatedTask = await this.save({
      ...task,
      ...body,
    });

    return updatedTask;
  }

  async deleteTask(id: string): Promise<string> {
    const task = await this.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID: ${id} not found.`);
    }
    await this.delete(id);

    return `Task with ID: ${id} deleted successfully.`;
  }
}
