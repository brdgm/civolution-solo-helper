import Action from './enum/Action'
import ScoringActionType from './enum/ScoringActionType'
import ScoringCategory from './enum/ScoringCategory'

export default interface Card {
  id: number
  diceActions?: DiceAction[]
  diceActionsAdvanced?: DiceAction[]
  scoringAction?: ScoringAction
  scoringActionAdvanced?: ScoringAction
  blueDotCount: number
  redDotCount: number
}

export interface DiceAction {
  values: number[]
  action: Action
  scoringCategory?: ScoringCategory
  count?: number
}

export interface ScoringAction {
  scoringActionType: ScoringActionType
  count: number
  vpCount?: number
  alternativeLastEraVPCount?: number
}
