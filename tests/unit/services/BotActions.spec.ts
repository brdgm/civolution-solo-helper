import NavigationState from '@/util/NavigationState'
import { expect } from 'chai'
import mockRouteLocation from '../helper/mockRouteLocation'
import mockState from '../helper/mockState'
import Player from '@/services/enum/Player'
import mockRound from '../helper/mockRound'
import mockTurn from '../helper/mockTurn'
import BotActions from '@/services/BotActions'
import Cards from '@/services/Cards'
import Action from '@/services/enum/Action'
import ScoringCategory from '@/services/enum/ScoringCategory'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

describe('services/BotActions', () => {
  it('reset', () => {
    const route = mockRouteLocation({name:'TurnBot', params:{round:'1',turn:'4'}})
    const navigationState = new NavigationState(route, getState(DifficultyLevel.BEGINNER))

    const botActions = new BotActions(navigationState.currentCard, navigationState)
    expect(botActions.isReset).to.eq(true)
    expect(botActions.items.length).to.eq(0)
  })

  it('diceActions', () => {
    const route = mockRouteLocation({name:'TurnBot', params:{round:'1',turn:'2'}})
    const navigationState = new NavigationState(route, getState(DifficultyLevel.BEGINNER))

    const botActions = new BotActions(Cards.get(1), navigationState)
    expect(botActions.isReset).to.eq(false)
    expect(botActions.items).to.eql([
      { action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.TECHNOLOGY, count: 1 },
      { action: Action.GAIN_FATE_DIE }
    ])
  })

  it('diceActions-advanced', () => {
    const route = mockRouteLocation({name:'TurnBot', params:{round:'1',turn:'2'}})
    const navigationState = new NavigationState(route, getState(DifficultyLevel.EXPERT))

    const botActions = new BotActions(Cards.get(1), navigationState)
    expect(botActions.isReset).to.eq(false)
    expect(botActions.items).to.eql([
      { action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.TECHNOLOGY, count: 1 },
      { action: Action.GAIN_VP, count: 3 }
    ])
  })

  it('scoringActions-current-era-scoring-category', () => {
    const route = mockRouteLocation({name:'TurnBot', params:{round:'1',turn:'2'}})
    const navigationState = new NavigationState(route, getState(DifficultyLevel.BEGINNER))

    const botActions = new BotActions(Cards.get(12), navigationState)
    expect(botActions.isReset).to.eq(false)
    expect(botActions.items).to.eql([
      { action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.PROSPERITY, count: 2 }
    ])
  })

  it('scoringActions-current-era-scoring-category-advanced', () => {
    const route = mockRouteLocation({name:'TurnBot', params:{round:'1',turn:'2'}})
    const navigationState = new NavigationState(route, getState(DifficultyLevel.EXPERT))

    const botActions = new BotActions(Cards.get(12), navigationState)
    expect(botActions.isReset).to.eq(false)
    expect(botActions.items).to.eql([
      { action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.PROSPERITY, count: 2 },
      { action: Action.GAIN_VP, count: 3 }
    ])
  })

  it('scoringActions-next-era-scoring-category', () => {
    const route = mockRouteLocation({name:'TurnBot', params:{round:'1',turn:'2'}})
    const navigationState = new NavigationState(route, getState(DifficultyLevel.BEGINNER))

    const botActions = new BotActions(Cards.get(13), navigationState)
    expect(botActions.isReset).to.eq(false)
    expect(botActions.items).to.eql([
      { action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.POPULATION, count: 2 }
    ])
  })

  it('scoringActions-next-era-scoring-category-last-round', () => {
    const route = mockRouteLocation({name:'TurnBot', params:{round:'4',turn:'2'}})
    const navigationState = new NavigationState(route, getState(DifficultyLevel.BEGINNER))

    const botActions = new BotActions(Cards.get(13), navigationState)
    expect(botActions.isReset).to.eq(false)
    expect(botActions.items).to.eql([
      { action: Action.GAIN_VP, count: 4 }
    ])
  })

  it('scoringActions-last-era-scoring-category', () => {
    const route = mockRouteLocation({name:'TurnBot', params:{round:'1',turn:'2'}})
    const navigationState = new NavigationState(route, getState(DifficultyLevel.BEGINNER))

    const botActions = new BotActions(Cards.get(14), navigationState)
    expect(botActions.isReset).to.eq(false)
    expect(botActions.items).to.eql([
      { action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.KNOWLEDGE, count: 1 }
    ])
  })

  it('scoringActions-final-scoring-categories', () => {
    const route = mockRouteLocation({name:'TurnBot', params:{round:'1',turn:'2'}})
    const navigationState = new NavigationState(route, getState(DifficultyLevel.EXPERT))

    const botActions = new BotActions(Cards.get(15), navigationState)
    expect(botActions.isReset).to.eq(false)
    expect(botActions.items).to.eql([
      { action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.EVOLUTION, count: 1 },
      { action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.PRESTIGE, count: 1 },
      { action: Action.ADVANCE_SCORING_CATEGORY, scoringCategory: ScoringCategory.TECHNOLOGY, count: 1 },
      { action: Action.GAIN_VP, count: 3 }
    ])
  })
})

function getState(difficultyLevel: DifficultyLevel) {
  return mockState({initialCardDeck:{pile:[1,2,3,4],discard:[]},
    difficultyLevel,
    eraScoringTiles: [ScoringCategory.PROSPERITY,ScoringCategory.POPULATION,ScoringCategory.CULTURE,ScoringCategory.KNOWLEDGE],
    finalScoringTiles: [ScoringCategory.EVOLUTION,ScoringCategory.PRESTIGE,ScoringCategory.TECHNOLOGY],
    rounds:[
      mockRound({round:1, turns:[
        mockTurn({round:1,turn:1,player:Player.PLAYER}),
        mockTurn({round:1,turn:2,player:Player.BOT,cardDeck:{pile:[2,3,4],discard:[1]},
            evolutionCount:2, prosperityCount:1, blueDotCount:3, redDotCount:2,
            actionRoll:3, territoryRoll:4, beaconRoll:5}),
        mockTurn({round:1,turn:3,player:Player.PLAYER}),
        mockTurn({round:1,turn:4,player:Player.BOT,cardDeck:{pile:[3,4],discard:[2,1]},
            evolutionCount:2, prosperityCount:1, blueDotCount:5, redDotCount:4})
      ]})
  ]})
}