export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export type UpdateTodoDto = Partial<Omit<Todo, 'id'>>;
