import api from './api';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoData {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  isCompleted?: boolean;
}

export interface UpdateTodoData extends Partial<CreateTodoData> {}

export interface TodosResponse {
  data: Todo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TodoQuery {
  status?: 'completed' | 'pending';
  priority?: 'low' | 'medium' | 'high';
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export const todosService = {
  async getTodos(query: TodoQuery = {}): Promise<TodosResponse> {
    const response = await api.get('/todos', { params: query });
    return response.data;
  },

  async getTodo(id: number): Promise<Todo> {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  async createTodo(data: CreateTodoData): Promise<Todo> {
    const response = await api.post('/todos', data);
    return response.data;
  },

  async updateTodo(id: number, data: UpdateTodoData): Promise<Todo> {
    const response = await api.patch(`/todos/${id}`, data);
    return response.data;
  },

  async deleteTodo(id: number): Promise<void> {
    await api.delete(`/todos/${id}`);
  },
};