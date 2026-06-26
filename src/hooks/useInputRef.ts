import { useRef } from 'react';
import type { Nullable } from '../types/Nullable';

export const useInputRef = () => {
  const inputRef = useRef<Nullable<HTMLInputElement>>(null);
  const focusInput = () => inputRef.current?.focus();

  const disableInput = () => {
    if (inputRef.current) {
      inputRef.current.disabled = true;
    }
  };

  const enableInput = () => {
    if (inputRef.current) {
      inputRef.current.disabled = false;
    }
  };

  return { inputRef, focusInput, disableInput, enableInput };
};
