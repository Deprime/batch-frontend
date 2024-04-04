import type { ICard } from "$lib/components/game/card/type"

export interface IBasePlayer {
  hp: number,
  activeCard: ICard|null,
}
