import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './DTO/create-task.dto';
import { Task } from './task.entity';
import { DataSource, Repository } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { UpdateTaskDto } from './DTO/update-task.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(body: CreateTaskDto, user: User): Promise<Task> {
    const task = this.create({ ...body, status: TaskStatus.DONE, user });
    await this.save(task);

    return task;
  }

  async findAll(): Promise<Task[]> {
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
    const task = await this.findTaskById(id);
    const updatedTask = await this.save({
      ...task,
      ...body,
    });

    return updatedTask;
  }

  async deleteTask(id: string): Promise<string> {
    const task = await this.findTaskById(id);
    await this.delete(task.id);

    return `Task with ID: ${id} deleted successfully.`;
  }
}
