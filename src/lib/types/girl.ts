
export type UUserState = 'none' | 'game_search' | 'in_game';

export interface IUser {
  id: number,
  username: string,
  language_code: string,
  state: UUserState,
  candy: number,
  girl_slots: number,
  box_slots: number,
}

export interface IDrop {
  exp: number,
  reward: "boost" | "money" | "gift" | "ton",
}

export type IGirl = {
  id: number,
  user_id: number,
  image: string,
  name: string,
  rarity: string,
  state: "feed"|"dance_ready"|"dance"|"sleep"|"stake",
  exp: number,
  exp_limit: number,
  level: number,
  box_points: IDrop[],
  feed_started_at: number,
  feed_price: number,
  feed_multiplier: number,
  token_balance: number,
  token_per_feed: number,
  slot_index: number,
}
