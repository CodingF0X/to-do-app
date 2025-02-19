import { DataSource } from 'typeorm';
import { Task } from './task/task.entity';
import { User } from './auth/user.entity';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'mmea',
  entities: [Task, User],
  synchronize: true,
});
