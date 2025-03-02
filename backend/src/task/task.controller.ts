import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './DTO/create-task.dto';
import { Task } from './task.entity';
import { UpdateTaskDto } from './DTO/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/create-user.decorator';
import { User } from '../auth/user.entity';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async createTask(
    @Body() body: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.CreateTask(body, user);
  }

  @Get()
  async getTasks(@GetUser() user: User): Promise<Task[]> {
    return this.taskService.getTasks(user);
  }

  @Get(':id')
  async getTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.updateTask(id, body, user);
  }

  @Delete(':id')
  async deleteTask(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<string> {
    return this.taskService.deleteTask(id, user);
  }
}
