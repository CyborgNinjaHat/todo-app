import type { FC, RefObject } from 'react';
import clsx from 'clsx';
import { CreateTodoForm } from '../CreateTodoForm';
import type { ValidationError } from '../../types/Error';
import type { Nullable } from '../../types/Nullable';

interface Props {
  inputRef: RefObject<Nullable<HTMLInputElement>>;
  hasTodos: boolean;
  allCompleted: boolean;
  onCreate: (title: string) => Promise<void>;
  onToggle: () => void;
  onError: (message: ValidationError) => void;
}

export const TodoAppHeader: FC<Props> = ({
  hasTodos,
  allCompleted,
  inputRef,
  onCreate,
  onToggle,
  onError,
}) => (
  <header className="todo-app__header">
    {hasTodos && (
      <button
        type="button"
        className={clsx('todo-app__toggle-all', {
          active: allCompleted,
        })}
        onClick={onToggle}
      />
    )}

    <CreateTodoForm onCreate={onCreate} onError={onError} inputRef={inputRef} />
  </header>
);
