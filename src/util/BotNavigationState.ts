import { BotPersistence, CardDeckPersistence, State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import AbstractNavigationState from './AbstractNavigationState'
import CardDeck from '@/services/CardDeck'
import Card from '@/services/Card'
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'
import Cards from '@/services/Cards'

export default class BotNavigationState extends AbstractNavigationState {

  private readonly cardDeck : CardDeck
  private readonly currentCard : Card
  private readonly actionRoll : number
  private readonly territoryRoll : number
  private readonly beaconRoll : number

  constructor(route : RouteLocation, state : State) {
    super(route, state)

    // try to load persistence with rolled die values for current turns
    const botPersistence = getBotPersistence(state, this.round, this.turn)
    if (botPersistence) {
      this.cardDeck = CardDeck.fromPersistence(botPersistence.cardDeck)
      this.actionRoll = botPersistence.actionRoll
      this.territoryRoll = botPersistence.territoryRoll
      this.beaconRoll = botPersistence.beaconRoll
    }
    // otherwise prepare new turn based on previous card deck
    else {
      this.cardDeck = CardDeck.fromPersistence(getCardDeckFromPreviousTurn(state, this.round, this.turn))
      // draw next card
      this.cardDeck.draw()
      // roll dice for action selection
      this.actionRoll = rollDice(6)
      this.territoryRoll = rollDice(6)
      this.beaconRoll = rollDice(6)
    }
    this.currentCard = this.cardDeck.currentCard ?? Cards.get(1)
  }

}

function getBotPersistence(state: State, round: number, turn: number) : BotPersistence|undefined {
  const roundData = state.rounds.find(item => item.round == round)
  if (roundData) {
    const turnData = roundData.turns.find(item => item.turn == turn)
    if (turnData && turnData.botPersistence) {
      return turnData.botPersistence
    }
  }
  return undefined
}

function getCardDeckFromPreviousTurn(state: State, round: number, turn: number) : CardDeckPersistence {
  const roundData = state.rounds.find(item => item.round == round)
  if (roundData) {
    const lastTurnCardDeck = roundData.turns
        .filter(item => (item.turn < turn) || turn == 0)
        .toSorted((a,b) => a.turn - b.turn)
        .map(item => item.botPersistence?.cardDeck)
        .find(item => item != undefined)
    if (lastTurnCardDeck) {
      return lastTurnCardDeck
    }
  }

  // check previous round
  if (round > 1) {
    return getCardDeckFromPreviousTurn(state, round - 1, 0)
  }

  // get initial card deck
  const initialCardDeck = state.setup.initialCardDeck
  if (initialCardDeck) {
    return initialCardDeck
  }
  return CardDeck.new().toPersistence()  // should never happen
}
