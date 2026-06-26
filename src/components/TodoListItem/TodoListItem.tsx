import { useState } from 'react';
import type { FC, Ref } from 'react';
import clsx from 'clsx';
import { UpdateTodoForm } from '../UpdateTodoForm';
import type { Todo, UpdateTodoDto } from '../../types/Todo';

interface Props {
  todo: Todo;
  isLoading: boolean;
  nodeRef: Ref<HTMLDivElement>;
  onRemove: (id: Todo['id']) => void;
  onUpdate: (id: Todo['id'], data: UpdateTodoDto) => Promise<void>;
}

export const TodoListItem: FC<Props> = ({ todo, isLoading, nodeRef, onRemove, onUpdate }) => {
  const { id, title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEditing = () => {
    setIsEditing((current) => !current);
  };

  const handleRemove = () => {
    onRemove(id);
  };

  const handleUpdateStatus = () => {
    onUpdate(id, { completed: !completed });
  };

  const handleUpdateTitle = async (updatedTitle: string) => {
    if (updatedTitle === '') {
      onRemove(id);

      return;
    }

    await onUpdate(id, { title: updatedTitle });
    handleToggleEditing();
  };

  return (
    <div ref={nodeRef} className={clsx('todo', { completed })}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          name={`todoStatus-${id}`}
          className="todo__status"
          checked={completed}
          onChange={handleUpdateStatus}
        />
        <span className="is-sr-only">Toggle todo status</span>
      </label>

      {isEditing ? (
        <UpdateTodoForm title={title} onClose={handleToggleEditing} onSubmit={handleUpdateTitle} />
      ) : (
        <>
          <span className="todo__title" onDoubleClick={handleToggleEditing}>
            {title}
          </span>

          <button type="button" className="todo__remove" onClick={handleRemove}>
            ×
          </button>
        </>
      )}

      <div className={clsx('modal overlay', { 'is-active': isLoading })}>
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
