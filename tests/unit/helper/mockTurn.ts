import { Turn } from '@/store/state'

export default function (params?: MockTurnParams) : Turn {
  return {
    round: params?.round ?? 1,
    turn: params?.turn ?? 1
  }
}

export interface MockTurnParams {
  round? : number
  turn? : number
}
