import type { RefObject, FC, ChangeEvent, SubmitEvent } from 'react';
import { useState } from 'react';
import { ValidationError } from '../../types/Error';
import type { Nullable } from '../../types/Nullable';

interface Props {
  inputRef: RefObject<Nullable<HTMLInputElement>>;
  onCreate: (title: string) => Promise<void>;
  onError: (message: ValidationError) => void;
}

export const CreateTodoForm: FC<Props> = ({ inputRef, onCreate, onError }) => {
  const [title, setTitle] = useState('');

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trimStart().replace(/\s{2,}/g, ' ');

    setTitle(value);
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trimEnd();

    if (trimmedTitle === '') {
      onError(ValidationError.EMPTY_TITLE);

      return;
    }

    onCreate(trimmedTitle).then(() => setTitle(''));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        autoFocus
        type="text"
        name="newTodo"
        className="todo-app__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleChangeInput}
      />
    </form>
  );
};
