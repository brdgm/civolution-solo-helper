import { Round, Turn } from '@/store/state'

export default function (params?: MockRoundParams) : Round {
  const round : Round = {
    round: params?.round ?? 1,
    turns: params?.turns ?? []
  }
  return round
}

export interface MockRoundParams {
  round? : number
  turns? : Turn[]
}
