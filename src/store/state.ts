import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import ScoringCategory from '@/services/enum/ScoringCategory'
import Player from '@/services/enum/Player'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        difficultyLevel: DifficultyLevel.BEGINNER,
        eraScoringTiles: [],
        finalScoringTiles: []
      },
      rounds: []
    } as State
  },
  actions: {
    resetGame() {
      this.setup.eraScoringTiles = []
      this.setup.finalScoringTiles = []
      this.setup.initialCardDeck = undefined
      this.rounds = []
    },
    storeRound(round : Round) {
      this.rounds = this.rounds.filter(item => item.round < round.round)
      this.rounds.push(round)
    },
    storeTurn(turn : Turn) {
      const round = this.rounds.find(item => item.round == turn.round)
      if (!round) {
        throw new Error(`Round ${turn.round} not found.`)
      }
      round.turns = round.turns.filter(item => (item.turn < turn.turn))
      round.turns.push(turn)
    }
  },
  persist: true
})

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  rounds: Round[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel
  eraScoringTiles: ScoringCategory[]
  finalScoringTiles: ScoringCategory[]
  initialCardDeck?: CardDeckPersistence
  debugMode?: boolean
}

export interface Round {
  round: number
  startPlayer: Player
  turns: Turn[]
}
export interface Turn {
  round: number
  turn: number
  player: Player
  botPersistence?: BotPersistence
}
export interface BotPersistence {
  cardDeck: CardDeckPersistence
  evolutionCount: number
  prosperityCount: number
  blueDotCount: number
  redDotCount: number
  actionRoll: number
  territoryRoll: number
  beaconRoll: number
  reset?: boolean
}
export interface CardDeckPersistence {
  pile: number[]
  discard: number[]
}
