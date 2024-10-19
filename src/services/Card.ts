import Action from './enum/Action'

export default interface Card {
  id: string
  actions: Action[]
}
