import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AuthService } from '../auth/auth.service';
import { TodosService } from '../todos/todos.service';
import { Priority } from '../todos/entities/todo.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const authService = app.get(AuthService);
  const todosService = app.get(TodosService);

  try {
    // Create sample users
    const user1 = await authService.register({
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
    });

    const user2 = await authService.register({
      username: 'jane_smith',
      email: 'jane@example.com',
      password: 'password123',
    });

    // Create sample todos for user1
    await todosService.create({
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the todo app',
      priority: Priority.HIGH,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }, user1.id);

    await todosService.create({
      title: 'Review code changes',
      description: 'Review pull requests from team members',
      priority: Priority.MEDIUM,
      isCompleted: true,
    }, user1.id);

    await todosService.create({
      title: 'Buy groceries',
      description: 'Milk, bread, eggs, and fruits',
      priority: Priority.LOW,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    }, user1.id);

    // Create sample todos for user2
    await todosService.create({
      title: 'Prepare presentation',
      description: 'Create slides for quarterly review',
      priority: Priority.HIGH,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    }, user2.id);

    console.log('Seed data created successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await app.close();
  }
}

seed();