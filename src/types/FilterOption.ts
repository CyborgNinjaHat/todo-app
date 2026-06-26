export const FilterOption = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const;

export type FilterOption = (typeof FilterOption)[keyof typeof FilterOption];
