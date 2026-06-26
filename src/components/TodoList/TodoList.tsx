import { type FC, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { TodoListItem } from '../TodoListItem';
import type { Todo, UpdateTodoDto } from '../../types/Todo';
import type { Nullable } from '../../types/Nullable';

interface TodoTransitionProps {
  todo: Todo;
  classNames: string;
  isLoading: boolean;
  onRemove: (id: Todo['id']) => void;
  onUpdate: (id: Todo['id'], data: UpdateTodoDto) => Promise<void>;
}

const TodoTransition: FC<TodoTransitionProps> = ({
  todo,
  classNames,
  isLoading,
  onRemove,
  onUpdate,
  ...transitionProps
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition {...transitionProps} nodeRef={nodeRef} timeout={300} classNames={classNames}>
      <TodoListItem
        nodeRef={nodeRef}
        todo={todo}
        isLoading={isLoading}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
    </CSSTransition>
  );
};

interface Props {
  todos: Todo[];
  tempTodo: Nullable<Todo>;
  pendingTodoIds: Todo['id'][];
  onRemove: (id: Todo['id']) => void;
  onUpdate: (id: Todo['id'], data: UpdateTodoDto) => Promise<void>;
}

export const TodoList: FC<Props> = ({ todos, tempTodo, pendingTodoIds, onRemove, onUpdate }) => {
  return (
    <section className="todo-app__main">
      <TransitionGroup>
        {todos.map((todo) => (
          <TodoTransition
            key={todo.id}
            todo={todo}
            classNames="item"
            isLoading={pendingTodoIds.includes(todo.id)}
            onRemove={onRemove}
            onUpdate={onUpdate}
          />
        ))}

        {tempTodo && (
          <TodoTransition
            key={tempTodo.id}
            todo={tempTodo}
            classNames="temp-item"
            isLoading
            onRemove={onRemove}
            onUpdate={onUpdate}
          />
        )}
      </TransitionGroup>
    </section>
  );
};
