import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm.config';
import databasseConfig from './config/databasse.config';
import { validationSchema } from './config/validation.schema';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      isGlobal: true,
      ignoreEnvFile: false,
      load: [databasseConfig],
      validationSchema: validationSchema,
    }),
    TaskModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    AuthModule,
  ],
})
export class AppModule {}
