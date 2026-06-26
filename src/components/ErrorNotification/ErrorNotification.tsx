import clsx from 'clsx';
import type { FC } from 'react';
import type { Nullable } from '../../types/Nullable';
import type { AppError } from '../../types/Error';

interface Props {
  errorMessage: Nullable<AppError>;
  onClose: () => void;
}

export const ErrorNotification: FC<Props> = ({ errorMessage, onClose }) => {
  return (
    <div
      className={clsx('notification is-danger is-light has-text-weight-normal', {
        hidden: errorMessage === null,
      })}
    >
      <button type="button" className="delete" onClick={onClose} />
      {errorMessage}
    </div>
  );
};
