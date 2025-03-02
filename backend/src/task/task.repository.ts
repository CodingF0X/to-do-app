import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './DTO/create-task.dto';
import { Task } from './task.entity';
import { DataSource, Repository } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { UpdateTaskDto } from './DTO/update-task.dto';
import { User } from '../auth/user.entity';

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

  async findAll(user: User): Promise<Task[]> {
    const query = await this.createQueryBuilder('task');
    query.where({ user });

    const tasks = await query.getMany();
    return tasks;
  }

  async findTaskById(id: string, user: User): Promise<Task> {
    const task = await this.findOne({ where: { id, user } });
    return task;
  }

  async updateTask(id: string, body: UpdateTaskDto, user: User): Promise<Task> {
    const task = await this.findTaskById(id, user);
    const updatedTask = await this.save({
      ...task,
      ...body,
    });

    return updatedTask;
  }

  async deleteTask(id: string, user: User): Promise<string> {
    const task = await this.findTaskById(id, user);
    await this.delete(task.id);

    return `Task with ID: ${id} deleted successfully.`;
  }
}
