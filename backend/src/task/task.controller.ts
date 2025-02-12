import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './DTO/create-task.dto';
import { ITask } from './task.model';
import { UpdateTaskDto } from './DTO/update-task.dto';
import { QueryDto } from './DTO/query.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(@Query() query: QueryDto) {
    if (Object.keys(query).length) {
      return this.taskService.searchTask(query);
    }
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getSingleTask(@Param('id') id: string): ITask {
    return this.taskService.getTaskById(id);
  }

  @Post()
  addTask(@Body() task: CreateTaskDto) {
    return this.taskService.createTask(task);
  }

  @Patch(':id')
  updateSingleTask(@Param('id') id: string, @Body() task: UpdateTaskDto) {
    return this.taskService.updateTask(id, task);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    this.taskService.deleteTask(id);
    return { message: `Task with ID ${id} deleted successfully` };
  }
}
