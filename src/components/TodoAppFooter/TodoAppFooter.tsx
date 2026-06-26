import clsx from 'clsx';
import type { FC } from 'react';
import { FilterOption } from '../../types/FilterOption';
import { NavLink } from 'react-router-dom';

interface Props {
  activeTodosCount: number;
  hasCompletedTodos: boolean;
  onRemoveCompleted: () => void;
}

export const TodoAppFooter: FC<Props> = ({
  activeTodosCount,
  hasCompletedTodos,
  onRemoveCompleted,
}) => (
  <footer className="todo-app__footer">
    <span className="todo-count">{activeTodosCount} items left</span>

    <nav className="filter">
      {Object.values(FilterOption).map((filter) => (
        <NavLink
          key={filter}
          to={`/${filter}`}
          className={({ isActive }) =>
            clsx('filter__link', {
              selected: isActive,
            })
          }
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </NavLink>
      ))}
    </nav>

    <button
      type="button"
      className="todo-app__clear-completed"
      disabled={!hasCompletedTodos}
      onClick={onRemoveCompleted}
    >
      Clear completed
    </button>
  </footer>
);
