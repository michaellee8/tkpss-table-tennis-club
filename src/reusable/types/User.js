export type User = {
  id: string,
  email: string,
  displayName: string,
  photoUrl: string,
  permission: number,
  stats: {
    hp: number,
    atk: number,
    def: number,
    cot: number,
    spe: number,
    int: number
  },
  score: number,
  remark: string,
  createTime: number,
  lastLoginTime: number,
  joinYear: number
};
