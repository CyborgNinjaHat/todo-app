import { useParams } from 'react-router-dom';
import { filterTodos } from '../utils/filterTodos';
import type { Todo } from '../types/Todo';
import type { FilterOption } from '../types/FilterOption';

export const useFilteredTodos = (todos: Todo[]) => {
  const { filter } = useParams();

  const filteredTodos = filterTodos(todos, filter as FilterOption);

  return { filteredTodos };
};
