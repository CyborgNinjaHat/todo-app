import type { FC, KeyboardEvent, ChangeEvent, SubmitEvent } from 'react';
import { useState, useRef } from 'react';
import { useInputRef } from '../../hooks/useInputRef';

interface Props {
  title: string;
  onSubmit: (title: string) => Promise<void>;
  onClose: () => void;
}

export const UpdateTodoForm: FC<Props> = ({ title, onSubmit, onClose }) => {
  const [newTitle, setNewTitle] = useState(title);
  const { inputRef, focusInput } = useInputRef();

  const isSubmittingRef = useRef(false);

  const handleEscKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trimStart().replace(/\s{2,}/g, ' ');

    setNewTitle(value);
  };

  const handleUpdateTitle = () => {
    const normalizedTitle = newTitle.trim();

    if (normalizedTitle === title) {
      onClose();

      return;
    }

    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;

    onSubmit(normalizedTitle)
      .catch(focusInput)
      .finally(() => (isSubmittingRef.current = false));
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    handleUpdateTitle();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        autoFocus
        ref={inputRef}
        type="text"
        name="todoTitle"
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        value={newTitle}
        onKeyDown={handleEscKeyDown}
        onChange={handleChangeInput}
        onBlur={handleUpdateTitle}
      />
    </form>
  );
};
