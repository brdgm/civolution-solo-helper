import Card, { DiceAction, ScoringAction } from './Card'
import Action from './enum/Action'
import DifficultyLevel from './enum/DifficultyLevel'
import ScoringActionType from './enum/ScoringActionType'
import ScoringCategory from './enum/ScoringCategory'
import NavigationState from '@/util/NavigationState'

/**
 * Manages the bot actions.
 */
export default class BotActions {

  readonly _items : ActionItem[]
  readonly _reset : boolean
  
  public constructor(currentCard: Card, navigationState: NavigationState) {
    const { blueDotCount, redDotCount, round, difficultyLevel,
      eraScoringTiles, finalScoringTiles, actionRoll } = navigationState

    // check reset
    this._reset = (blueDotCount >= 4 && redDotCount >= 4)

    // collect actions
    if (!this.isReset && currentCard.diceActions && currentCard.diceActionsAdvanced) {
      if (isAdvanced(round, difficultyLevel)) {
        this._items = getDiceActions(currentCard.diceActionsAdvanced, actionRoll)
      }
      else {
        this._items = getDiceActions(currentCard.diceActions, actionRoll)
      }
    }
    else if (!this.isReset && currentCard.scoringAction && currentCard.scoringActionAdvanced) {
      if (isAdvanced(round, difficultyLevel)) {
        this._items = getScoringActions(currentCard.scoringActionAdvanced, round, eraScoringTiles, finalScoringTiles)
      }
      else {
        this._items = getScoringActions(currentCard.scoringAction, round, eraScoringTiles, finalScoringTiles)
      }
    }
    else {
      this._items = []
    }
  }

  public get items() : readonly ActionItem[] {
    return this._items
  }

  public get isReset() : boolean {
    return this._reset
  }

}

export interface ActionItem {
  action: Action
  scoringCategory?: ScoringCategory
  count?: number
}

function isAdvanced(round: number, difficultyLevel: DifficultyLevel) : boolean {
  switch (difficultyLevel) {
    case DifficultyLevel.BEGINNER:
      return false
    case DifficultyLevel.MODERATE:
      return round >= 4
    case DifficultyLevel.MEDIUM:
      return round >= 3
    case DifficultyLevel.ADVANCED:
      return round >= 2
    case DifficultyLevel.EXPERT:
      return true
    default:
      throw new Error(`Invalid difficulty level: ${difficultyLevel}`)
  }
}

function getDiceActions(diceActions: DiceAction[], actionRoll: number) : ActionItem[] {
  return diceActions.
      filter(item => item.values.includes(actionRoll))
      .map(item => {
        const { action, scoringCategory, count } = item
        const actionItem : ActionItem = { action }
        if (scoringCategory) {
          actionItem.scoringCategory = scoringCategory
        }
        if (count) {
          actionItem.count = count
        }
        return actionItem
      })
}

function getScoringActions(scoringAction: ScoringAction, round: number,
    eraScoringTiles: ScoringCategory[], finalScoringTiles: ScoringCategory[]) : ActionItem[] {
  const { scoringActionType, count, vpCount, alternativeLastEraVPCount } = scoringAction
  switch (scoringActionType) {
    case ScoringActionType.CURRENT_ERA_SCORING_CATEGORY:
      return getEraScoringCategoryActions(getEraScoringCategory(eraScoringTiles, round), count, vpCount)
    case ScoringActionType.NEXT_ERA_SCORING_CATEGORY:
      if (round < 4) {
        return getEraScoringCategoryActions(getEraScoringCategory(eraScoringTiles, round+1), count, vpCount)
      }
      else {
        return [{ action:Action.GAIN_VP, count:alternativeLastEraVPCount }]
      }
    case ScoringActionType.LAST_ERA_SCORING_CATEGORY:
      return getEraScoringCategoryActions(getEraScoringCategory(eraScoringTiles, 4), count, vpCount)
    case ScoringActionType.FINAL_SCORING_CATEGORIES:
      return getFinalScoringCategoryActions(finalScoringTiles, count, vpCount)
    default:
      throw new Error(`Invalid scoring action type: ${scoringActionType}`)
  }
}

function getEraScoringCategory(eraScoringTiles: ScoringCategory[], round:number) : ScoringCategory {
  const scoringCategory = eraScoringTiles[round-1]
  if (!scoringCategory) {
    throw new Error(`Invalid era scoring category: ${round}`)
  }
  return scoringCategory
}

function getEraScoringCategoryActions(scoringCategory: ScoringCategory, count: number, vpCount?: number) : ActionItem[] {
  const items : ActionItem[] = []
  items.push({ action:Action.ADVANCE_SCORING_CATEGORY, scoringCategory, count })
  if (vpCount) {
    items.push({ action:Action.GAIN_VP, count:vpCount })
  }
  return items
}

function getFinalScoringCategoryActions(scoringCategories: ScoringCategory[], count: number, vpCount?: number) : ActionItem[] {
  const items : ActionItem[] = []
  scoringCategories.forEach(scoringCategory => {
    items.push({ action:Action.ADVANCE_SCORING_CATEGORY, scoringCategory, count })
  })
  if (vpCount) {
    items.push({ action:Action.GAIN_VP, count:vpCount })
  }
  return items
}
