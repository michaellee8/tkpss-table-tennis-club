import type { Comment } from "./Comment";
import type { User } from "./User";

export type Post = {
  mediaUrls: Array<string>,
  content: string,
  title: string,
  comments:Array<Comment>
  mentioned: any,
  authorId: string,
  timestamp: number
};
