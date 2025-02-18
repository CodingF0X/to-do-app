import { IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
