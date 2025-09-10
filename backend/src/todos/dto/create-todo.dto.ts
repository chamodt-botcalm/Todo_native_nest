import { IsString, IsOptional, IsEnum, IsDateString, IsBoolean } from 'class-validator';
import { Priority } from '../entities/todo.entity';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}