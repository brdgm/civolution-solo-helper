import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { Round, State } from '@/store/state'

export default function (params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      difficultyLevel: params?.difficultyLevel ?? DifficultyLevel.BEGINNER
    },
    rounds: params?.rounds ?? []
  }
}

export interface MockStateParams {
  difficultyLevel?: DifficultyLevel
  rounds?: Round[]
}
