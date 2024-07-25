
export type UUserState = 'none' | 'game_search' | 'in_game';

export interface IUser {
  id: number,
  username: string,
  language_code: string,
  last_played_at: number|null,
  state: UUserState,
  candy: number,
  energy: number,
  token: number,
  star: number,
  girl_slots: number,
  box_slots: number,
}
