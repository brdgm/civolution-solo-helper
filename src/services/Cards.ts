import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import Action from './enum/Action'
import ScoringCategory from './enum/ScoringCategory'
import ScoringActionType from './enum/ScoringActionType'

/**
 * Solo cards.
 */
const cards : Card[] = [
  {
    id: 1,
    diceActions: [
      { values: [1], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.TECHNOLOGY, count: 1 },
      { values: [1], action: Action.REMOVE_CARD, scoringCategory: ScoringCategory.TECHNOLOGY },
      { values: [2,3], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.TECHNOLOGY, count: 1 },
      { values: [2,3], action: Action.GAIN_FATE_DIE },
      { values: [4,5,6], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.CONSTRUCTION, count: 1 },
    ],
    diceActionsAdvanced: [
      { values: [1], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.TECHNOLOGY, count: 2 },
      { values: [1], action: Action.REMOVE_CARD, scoringCategory: ScoringCategory.TECHNOLOGY },
      { values: [2,3], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.TECHNOLOGY, count: 1 },
      { values: [2,3], action: Action.GAIN_VP, count: 3 },
      { values: [4,5,6], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.CONSTRUCTION, count: 2 },
      { values: [4,5,6], action: Action.GAIN_FATE_DIE },
    ],
    blueDotCount: 2,
    redDotCount: 1
  },
  {
    id: 2,
    diceActions: [
      { values: [1,2], action: Action.PLACE_STATUE },
      { values: [3,4], action: Action.REVEAL_SITES },
      { values: [3,4], action: Action.ADVANCE_FAVOR },
      { values: [5,6], action: Action.REVEAL_SITES },
    ],
    diceActionsAdvanced: [
      { values: [1,2], action: Action.PLACE_STATUE },
      { values: [1,2], action: Action.ADVANCE_FAVOR },
      { values: [3,4], action: Action.REVEAL_SITES },
      { values: [3,4], action: Action.ADVANCE_FAVOR },
      { values: [5,6], action: Action.REVEAL_SITES },
      { values: [5,6], action: Action.GAIN_VP, count: 3 },
    ],
    blueDotCount: 1,
    redDotCount: 1
  },
  {
    id: 3,
    diceActions: [
      { values: [1], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.CONSTRUCTION, count: 1 },
      { values: [1], action: Action.REMOVE_CARD, scoringCategory: ScoringCategory.CONSTRUCTION },
      { values: [2,3], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.CONSTRUCTION, count: 1 },
      { values: [2,3], action: Action.GAIN_ACTIVATION_DIE },
      { values: [4,5,6], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.PRESTIGE, count: 1 },
    ],
    diceActionsAdvanced: [
      { values: [1], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.CONSTRUCTION, count: 2 },
      { values: [1], action: Action.REMOVE_CARD, scoringCategory: ScoringCategory.CONSTRUCTION },
      { values: [2,3], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.CONSTRUCTION, count: 1 },
      { values: [2,3], action: Action.GAIN_VP, count: 3 },
      { values: [4,5,6], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.PRESTIGE, count: 2 },
      { values: [4,5,6], action: Action.GAIN_ACTIVATION_DIE },
    ],
    blueDotCount: 2,
    redDotCount: 1
  },
  {
    id: 4,
    diceActions: [
      { values: [1,2], action: Action.ADVANCE_FAVOR },
      { values: [1,2], action: Action.PLACE_HUNTING_TOKEN },
      { values: [3,4], action: Action.PLACE_STATUE },
      { values: [3,4], action: Action.PLACE_HUNTING_TOKEN },
      { values: [5,6], action: Action.PLACE_PROSPERITY_MARKER, count: 1 },
      { values: [5,6], action: Action.PLACE_HUNTING_TOKEN },
    ],
    diceActionsAdvanced: [
      { values: [1,2], action: Action.PLACE_STATUE },
      { values: [1,2], action: Action.PLACE_HUNTING_TOKEN },
      { values: [3,4], action: Action.PLACE_STATUE },
      { values: [3,4], action: Action.PLACE_HUNTING_TOKEN },
      { values: [5,6], action: Action.PLACE_PROSPERITY_MARKER, count: 2 },
      { values: [5,6], action: Action.PLACE_HUNTING_TOKEN },
    ],
    blueDotCount: 1,
    redDotCount: 1
  },
  {
    id: 5,
    diceActions: [
      { values: [1], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.KNOWLEDGE, count: 1 },
      { values: [1], action: Action.REMOVE_CARD, scoringCategory: ScoringCategory.KNOWLEDGE },
      { values: [2,3], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.KNOWLEDGE, count: 1 },
      { values: [2,3], action: Action.GAIN_ACTIVATION_DIE },
      { values: [4,5,6], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.TECHNOLOGY, count: 1 },
    ],
    diceActionsAdvanced: [
      { values: [1], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.KNOWLEDGE, count: 2 },
      { values: [1], action: Action.REMOVE_CARD, scoringCategory: ScoringCategory.KNOWLEDGE },
      { values: [2,3], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.KNOWLEDGE, count: 1 },
      { values: [2,3], action: Action.GAIN_VP, count: 3 },
      { values: [4,5,6], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.TECHNOLOGY, count: 2 },
      { values: [4,5,6], action: Action.GAIN_ACTIVATION_DIE },
    ],
    blueDotCount: 1,
    redDotCount: 2
  },
  {
    id: 6,
    diceActions: [
      { values: [1], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.CULTURE, count: 1 },
      { values: [1], action: Action.REMOVE_CARD, scoringCategory: ScoringCategory.CULTURE },
      { values: [2,3], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.CULTURE, count: 1 },
      { values: [2,3], action: Action.GAIN_FATE_DIE },
      { values: [4,5,6], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.KNOWLEDGE, count: 1 },
    ],
    diceActionsAdvanced: [
      { values: [1], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.CULTURE, count: 2 },
      { values: [1], action: Action.REMOVE_CARD, scoringCategory: ScoringCategory.CULTURE },
      { values: [2,3], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.CULTURE, count: 1 },
      { values: [2,3], action: Action.GAIN_VP, count: 3 },
      { values: [4,5,6], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.KNOWLEDGE, count: 2 },
      { values: [4,5,6], action: Action.GAIN_FATE_DIE },
    ],
    blueDotCount: 1,
    redDotCount: 2
  },
  {
    id: 7,
    diceActions: [
      { values: [1,2], action: Action.PLACE_STATUE },
      { values: [3,4], action: Action.PERFORM_MIGRATION },
      { values: [5,6], action: Action.PLACE_EVOLUTION_MARKER, count: 1 },
      { values: [5,6], action: Action.PLACE_HUNTING_TOKEN },
    ],
    diceActionsAdvanced: [
      { values: [1,2], action: Action.PLACE_STATUE },
      { values: [1,2], action: Action.ADVANCE_FAVOR },
      { values: [3,4], action: Action.PERFORM_MIGRATION },
      { values: [3,4], action: Action.PERFORM_PROCREATION },
      { values: [5,6], action: Action.PLACE_EVOLUTION_MARKER, count: 2 },
      { values: [5,6], action: Action.PLACE_HUNTING_TOKEN },
    ],
    blueDotCount: 1,
    redDotCount: 1
  },
  {
    id: 8,
    diceActions: [
      { values: [1], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.PRESTIGE, count: 1 },
      { values: [1], action: Action.REMOVE_CARD, scoringCategory: ScoringCategory.PRESTIGE },
      { values: [2,3], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.PRESTIGE, count: 1 },
      { values: [2,3], action: Action.PERFORM_PROVISION },
      { values: [4,5,6], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.CULTURE, count: 1 },
    ],
    diceActionsAdvanced: [
      { values: [1], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.PRESTIGE, count: 2 },
      { values: [1], action: Action.REMOVE_CARD, scoringCategory: ScoringCategory.PRESTIGE },
      { values: [2,3], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.PRESTIGE, count: 1 },
      { values: [2,3], action: Action.GAIN_VP, count: 3 },
      { values: [4,5,6], action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.CULTURE, count: 2 },
      { values: [4,5,6], action: Action.PERFORM_PROVISION },
    ],
    blueDotCount: 2,
    redDotCount: 2
  },
  {
    id: 9,
    diceActions: [
      { values: [1,2], action: Action.PERFORM_PROCREATION },
      { values: [1,2], action: Action.PERFORM_PROVISION },
      { values: [3,4], action: Action.PERFORM_MIGRATION },
      { values: [3,4], action: Action.PERFORM_PROVISION },
      { values: [5,6], action: Action.PERFORM_PROCREATION },
      { values: [5,6], action: Action.PERFORM_MIGRATION },
    ],
    diceActionsAdvanced: [
      { values: [1,2], action: Action.PERFORM_PROCREATION },
      { values: [1,2], action: Action.PERFORM_PROCREATION },
      { values: [1,2], action: Action.PERFORM_PROVISION },
      { values: [3,4], action: Action.PERFORM_PROCREATION },
      { values: [3,4], action: Action.PERFORM_MIGRATION },
      { values: [3,4], action: Action.PERFORM_PROVISION },
      { values: [5,6], action: Action.PERFORM_MIGRATION },
      { values: [5,6], action: Action.PERFORM_PROCREATION },
      { values: [5,6], action: Action.PERFORM_PROVISION },
    ],
    blueDotCount: 1,
    redDotCount: 1
  },
  {
    id: 10,
    diceActions: [
      { values: [1,2], action: Action.PERFORM_PROCREATION },
      { values: [3,4], action: Action.PLACE_PROSPERITY_MARKER, count: 1 },
      { values: [5,6], action: Action.PLACE_EVOLUTION_MARKER, count: 1 },
    ],
    diceActionsAdvanced: [
      { values: [1,2], action: Action.PERFORM_PROCREATION },
      { values: [1,2], action: Action.GAIN_VP, count: 3 },
      { values: [3,4], action: Action.PLACE_PROSPERITY_MARKER, count: 1 },
      { values: [3,4], action: Action.GAIN_VP, count: 3 },
      { values: [5,6], action: Action.PLACE_EVOLUTION_MARKER, count: 1 },
      { values: [5,6], action: Action.GAIN_VP, count: 3 },
    ],
    blueDotCount: 1,
    redDotCount: 1
  },
  {
    id: 11,
    scoringAction: { scoringActionType: ScoringActionType.CURRENT_ERA_SCORING_CATEGORY, count: 1 },
    scoringActionAdvanced: { scoringActionType: ScoringActionType.CURRENT_ERA_SCORING_CATEGORY, count: 2 },
    blueDotCount: 0,
    redDotCount: 1
  },
  {
    id: 12,
    scoringAction: { scoringActionType: ScoringActionType.CURRENT_ERA_SCORING_CATEGORY, count: 2 },
    scoringActionAdvanced: { scoringActionType: ScoringActionType.CURRENT_ERA_SCORING_CATEGORY, count: 2, vpCount: 3 },
    blueDotCount: 1,
    redDotCount: 0
  },
  {
    id: 13,
    scoringAction: { scoringActionType: ScoringActionType.NEXT_ERA_SCORING_CATEGORY, count: 2, alternativeLastEraVPCount: 4 },
    scoringActionAdvanced: { scoringActionType: ScoringActionType.NEXT_ERA_SCORING_CATEGORY, count: 2, vpCount: 3, alternativeLastEraVPCount: 7 },
    blueDotCount: 0,
    redDotCount: 1
  },
  {
    id: 14,
    scoringAction: { scoringActionType: ScoringActionType.LAST_ERA_SCORING_CATEGORY, count: 1 },
    scoringActionAdvanced: { scoringActionType: ScoringActionType.LAST_ERA_SCORING_CATEGORY, count: 1, vpCount: 3 },
    blueDotCount: 1,
    redDotCount: 1
  },
  {
    id: 15,
    scoringAction: { scoringActionType: ScoringActionType.FINAL_SCORING_CATEGORIES, count: 1 },
    scoringActionAdvanced: { scoringActionType: ScoringActionType.FINAL_SCORING_CATEGORIES, count: 1, vpCount: 3 },
    blueDotCount: 1,
    redDotCount: 0
  },
]

const cardsMap = new Map<number,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @returns Cards
   */
  getAll() : Card[] {
    return cards
  }

}
