import type { User } from './User';

export type Comment = {
  authorId: string,
  id: string,
  content: string,
  timestamp: number
};
