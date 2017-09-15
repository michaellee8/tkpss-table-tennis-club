import type { Comment } from "./Comment";

export type User = {
  id: string,
  searchName: string,
  displayName: string,
  photoUrl: string,
  privllageLevel: number,
  stats: {
    hp: number,
    atk: number,
    def: number,
    cot: number,
    spe: number,
    int: number
  },
  comments: Array<Comment>
};
