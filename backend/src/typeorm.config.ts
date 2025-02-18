import { DataSource } from 'typeorm';
import { Task } from './task/task.entity';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'mmea',
  entities: [Task],
  synchronize: true,
});
