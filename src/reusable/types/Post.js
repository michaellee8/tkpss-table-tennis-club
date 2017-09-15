import type { Comment } from "./Comment";
import type { User } from "./User";

export type Post = {
  mediaUrls: Array<string>,
  content: string,
  title: string,
  subtitle: string,
  views: any,
  reactions: any,
  mentioned: any
};
