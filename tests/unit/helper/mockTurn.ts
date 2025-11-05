import CardDeck from '@/services/CardDeck'
import Player from '@/services/enum/Player'
import { CardDeckPersistence, Turn } from '@/store/state'

export default function mockTurn(params?: MockTurnParams) : Turn {
  const turn : Turn = {
    round: params?.round ?? 1,
    turn: params?.turn ?? 1,
    player: params?.player ?? Player.PLAYER
  }
  if (params?.cardDeck || params?.evolutionCount || params?.prosperityCount
        || params?.actionRoll || params?.blueDotCount || params?.redDotCount || params?.reset) {
    turn.botPersistence = {
      cardDeck: params?.cardDeck ?? CardDeck.new().toPersistence(),
      evolutionCount: params?.evolutionCount ?? 0,
      prosperityCount: params?.prosperityCount ?? 0,
      blueDotCount: params?.blueDotCount ?? 0,
      redDotCount: params?.redDotCount ?? 0,
      actionRoll: params?.actionRoll ?? 0,
      reset: params?.reset
    }
  }
  return turn
}

export interface MockTurnParams {
  round? : number
  turn? : number
  player? : Player
  cardDeck?: CardDeckPersistence
  evolutionCount?: number
  prosperityCount?: number
  blueDotCount?: number
  redDotCount?: number
  actionRoll?: number
  reset?: boolean
}
