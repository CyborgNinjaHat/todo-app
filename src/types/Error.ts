export const StatusError = {
  GET: 'Unable to load todos',
  POST: 'Unable to add a todo',
  DELETE: 'Unable to delete a todo',
  UPDATE: 'Unable to update a todo',
} as const;

export const ValidationError = {
  EMPTY_TITLE: 'Title should not be empty',
} as const;

export type StatusError = (typeof StatusError)[keyof typeof StatusError];

export type ValidationError = (typeof ValidationError)[keyof typeof ValidationError];

export type AppError = StatusError | ValidationError;
