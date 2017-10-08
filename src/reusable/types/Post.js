import type { Comment } from "./Comment";
import type { User } from "./User";

export type Post = {
  content: string,
  comments:Array<Comment>
  authorId: string,
  createTime: number
};
