import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDataSource } from './typeorm.config';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot(appDataSource.options),
    AuthModule,
  ],
})
export class AppModule {}
