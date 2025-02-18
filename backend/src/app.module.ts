import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDataSource } from './typeorm.config';
@Module({
  imports: [TaskModule, TypeOrmModule.forRoot(appDataSource.options)],
})
export class AppModule {}
