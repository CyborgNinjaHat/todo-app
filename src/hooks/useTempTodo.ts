import { useState } from 'react';
import type { Nullable } from '../types/Nullable';
import type { Todo } from '../types/Todo';

export const useTempTodo = () => {
  const [tempTodo, setTempTodo] = useState<Nullable<Todo>>(null);

  const createTempTodo = (title: string) => {
    setTempTodo({ id: '0', title, completed: false });
  };

  const removeTempTodo = () => {
    setTempTodo(null);
  };

  return { tempTodo, createTempTodo, removeTempTodo };
};
