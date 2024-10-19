import DifficultyLevel from '@/services/enum/DifficultyLevel'
import ScoringCategory from '@/services/enum/ScoringCategory'
import { CardDeckPersistence, Round, State } from '@/store/state'

export default function (params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      difficultyLevel: params?.difficultyLevel ?? DifficultyLevel.BEGINNER,
      eraScoringTiles: params?.eraScoringTiles ?? [],
      finalScoringTiles: params?.finalScoringTiles ?? [],
      initialCardDeck: params?.initialCardDeck
    },
    rounds: params?.rounds ?? []
  }
}

export interface MockStateParams {
  difficultyLevel?: DifficultyLevel,
  eraScoringTiles?: ScoringCategory[],
  finalScoringTiles?: ScoringCategory[],
  initialCardDeck?: CardDeckPersistence,
  rounds?: Round[]
}
