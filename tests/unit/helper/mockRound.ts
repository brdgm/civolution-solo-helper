import Player from '@/services/enum/Player'
import { Round, Turn } from '@/store/state'

export default function mockRound(params?: MockRoundParams) : Round {
  const round : Round = {
    round: params?.round ?? 1,
    startPlayer: params?.startPlayer ?? Player.PLAYER,
    turns: params?.turns ?? []
  }
  return round
}

export interface MockRoundParams {
  round? : number,
  startPlayer?: Player,
  turns? : Turn[]
}
