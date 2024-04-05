
export type UUserState = 'none' | 'game_search' | 'in_game';

export interface IUser {
  id: number,
  username: string,
  language_code: string,
  state: UUserState,
}
