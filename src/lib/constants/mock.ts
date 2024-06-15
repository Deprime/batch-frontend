import type { IUser } from "$lib/types/user";
import type { IGirl } from "$lib/types/girl";

export const MOCK_GIRL: IGirl = {
  id: 1,
  user_id: 1,
  image: "1-common.png",
  name: "Lolly chan",
  rarity: "Uncommon",
  state: "feed",
  exp: 0,
  exp_limit: 20,
  level: 1,
  box_points: [5, 12],
  feed_started_at: 1,
  feed_price: 1,
  feed_multiplier: 1,
  token_balance: 0,
  token_per_feed: 0.04,
  slot_index: 1,
};

export const DEV_MODE_USER: IUser = {
  id: 1,
  username: 'HypePlayer',
  language_code: 'ru',
  state: 'none',
  candy: 50,
  token: 0,
  star: 30,
  girl_slots: 1,
  box_slots: 2,
}
