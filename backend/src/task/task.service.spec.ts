import { Test } from '@nestjs/testing';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';
import { User } from '../auth/user.entity';
import { NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

describe('Testing Task Service', () => {
  let taskService: TaskService;
  let taskRepository: TaskRepository;

  const mockUser: User = {
    id: '123',
    userName: 'testUser',
    password: 'testPassword',
    task: [],
  };

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Test Task 1',
      description: 'Test Description 1',
      status: TaskStatus.OPEN,
      user: mockUser,
    },
    {
      id: '2',
      title: 'Test Task 2',
      description: 'Test Description 2',
      status: TaskStatus.IN_PROGRESS,
      user: mockUser,
    },
  ];

  const mockTaskRepository = () => ({
    createTask: jest.fn(),
    findAll: jest.fn(),
    findTaskById: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    taskService = module.get(TaskService);
    taskRepository = module.get(TaskRepository);
  });

  describe('Get All Tasks', () => {
    it('should find all tasks and return and array of tasks', async () => {
      expect(taskRepository.findAll).not.toHaveBeenCalled();
      jest.spyOn(taskRepository, 'findAll').mockResolvedValue(mockTasks);
      const res = await taskService.getTasks(mockUser);
      expect(taskRepository.findAll).toHaveBeenCalled();
      expect(res).toEqual(mockTasks);
    });

    it('should throw exception if no tasks found', async () => {
      jest.spyOn(taskRepository, 'findAll').mockResolvedValue([]);
      await expect(taskService.getTasks(mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('GET task by ID', () => {
    it('Should find task by ID', async () => {
      expect(taskRepository.findTaskById).not.toHaveBeenCalled();
      jest
        .spyOn(taskRepository, 'findTaskById')
        .mockResolvedValue(mockTasks[0]);

      const res = await taskService.getTaskById('1', mockUser);
      expect(taskRepository.findTaskById).toHaveBeenCalled();
      expect(res).toEqual(mockTasks[0]);
    });

    it('Should throw NotFoundException if the task does not exist', async () => {
      jest.spyOn(taskRepository, 'findTaskById').mockResolvedValue(null);
      const res = taskService.getTaskById('10', mockUser);
      expect(taskRepository.findTaskById).toHaveBeenCalled();
      await expect(res).rejects.toThrow(NotFoundException);
    });
  });
});
