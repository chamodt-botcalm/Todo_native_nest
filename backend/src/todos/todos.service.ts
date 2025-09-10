import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { QueryTodoDto } from './dto/query-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    const todo = this.todoRepository.create({
      ...createTodoDto,
      userId,
    });
    return this.todoRepository.save(todo);
  }

  async findAll(userId: number, queryDto: QueryTodoDto) {
    const { status, priority, search, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC' } = queryDto;
    
    const queryBuilder = this.todoRepository
      .createQueryBuilder('todo')
      .where('todo.userId = :userId', { userId });

    if (status) {
      queryBuilder.andWhere('todo.isCompleted = :isCompleted', {
        isCompleted: status === 'completed',
      });
    }

    if (priority) {
      queryBuilder.andWhere('todo.priority = :priority', { priority });
    }

    if (search) {
      queryBuilder.andWhere('todo.title LIKE :search', { search: `%${search}%` });
    }

    queryBuilder
      .orderBy(`todo.${sortBy}`, sortOrder)
      .skip((page - 1) * limit)
      .take(limit);

    const [todos, total] = await queryBuilder.getManyAndCount();

    return {
      data: todos,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number, userId: number) {
    const todo = await this.todoRepository.findOne({
      where: { id, userId },
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, userId: number) {
    const todo = await this.findOne(id, userId);
    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  async remove(id: number, userId: number) {
    const todo = await this.findOne(id, userId);
    await this.todoRepository.remove(todo);
    return { message: 'Todo deleted successfully' };
  }
}