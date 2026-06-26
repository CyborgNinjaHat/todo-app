import type { Todo, UpdateTodoDto } from '../types/Todo';
import { client } from '../utils/fetchClient';

const load = () => {
  return client.get<Todo[]>(`/todos`);
};

const create = (title: string) => {
  return client.post<Todo>('/todos', {
    completed: false,
    title,
  });
};

const update = (id: Todo['id'], data: UpdateTodoDto) => {
  return client.patch<Todo>(`/todos/${id}`, data);
};

const remove = (id: Todo['id']) => {
  return client.delete(`/todos/${id}`);
};

export const todoApi = {
  load,
  create,
  update,
  remove,
};
