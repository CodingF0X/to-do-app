import { Injectable } from '@nestjs/common';
import { ITask, ITaskStatus } from './task.model';
import { CreateTaskDto } from './DTO/create-task.dto';
import { UpdateTaskDto } from './DTO/update-task.dto';
import { QueryDto } from './DTO/query.dto';

@Injectable()
export class TaskService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  getTaskById(id: string): ITask {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new Error(`Task with id ${id} not found.`);
    }
    return task;
  }

  createTask(task: CreateTaskDto): ITask {
    const { title, description } = task;
    const newTask: ITask = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      status: ITaskStatus.OPEN,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, newTask: UpdateTaskDto): ITask {
    const task = this.getTaskById(id);

    const updatedTask: ITask = {
      ...task,
      title: newTask.title ?? task.title,
      description: newTask.description ?? task.description,
      status: newTask.status ? (newTask.status as ITaskStatus) : task.status,
    };

    this.tasks = this.tasks.map((t) => (t.id === id ? updatedTask : t));

    return task;
  }

  searchTask(query: QueryDto): ITask[] {
    const { searchTerm, status } = query;
    const tasks = this.tasks.filter((task) => {
      if (
        task.title.includes(searchTerm) ||
        task.description.includes(searchTerm)
      ) {
        return true;
      }

      if (task.status.includes(status)) {
        return true;
      }
    });

    return tasks;
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
