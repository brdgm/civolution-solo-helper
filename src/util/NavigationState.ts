import { BotPersistence, State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import CardDeck from '@/services/CardDeck'
import Card from '@/services/Card'
import Cards from '@/services/Cards'
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'
import Player from '@/services/enum/Player'

export default class NavigationState {

  readonly round : number
  readonly turn : number
  readonly startPlayer : Player
  readonly player : Player
  
  readonly cardDeck : CardDeck
  readonly evolutionCount : number
  readonly prosperityCount : number
  readonly currentCard : Card
  readonly actionRoll : number
  readonly territoryRoll : number
  readonly beaconRoll : number

  constructor(route: RouteLocation, state: State) {    
    this.round = getIntRouteParam(route, 'round')
    if (route.name == 'RoundEnd' || route.name == 'GameEnd') {
      this.turn = MAX_TURN
    }
    else {
      this.turn = getIntRouteParam(route, 'turn')
    }

    this.startPlayer = getStartPlayer(state, this.round)
    this.player = getPlayer(route, this.startPlayer)

    // try to load persistence with rolled die values for current turns
    const botPersistence = getBotPersistence(state, this.round, this.turn)
    if (botPersistence) {
      this.cardDeck = CardDeck.fromPersistence(botPersistence.cardDeck)
      this.evolutionCount = botPersistence.evolutionCount
      this.prosperityCount = botPersistence.prosperityCount
      this.actionRoll = botPersistence.actionRoll
      this.territoryRoll = botPersistence.territoryRoll
      this.beaconRoll = botPersistence.beaconRoll
    }
    // otherwise prepare new turn based on previous card deck
    else {
      const previousBotPersistence = getPreviousBotPersistence(state, this.round, this.turn)
      this.cardDeck = CardDeck.fromPersistence(previousBotPersistence.cardDeck)
      // draw next card
      this.cardDeck.draw()
      // counters
      this.evolutionCount = previousBotPersistence.evolutionCount
      this.prosperityCount = previousBotPersistence.prosperityCount
      // roll dice for action selection
      this.actionRoll = rollDice(6)
      this.territoryRoll = rollDice(6)
      this.beaconRoll = rollDice(6)
    }
    this.currentCard = this.cardDeck.currentCard ?? Cards.get(1)
  }

}

const MAX_TURN = 999

function getStartPlayer(state: State, round: number) : Player {
  const roundData = state.rounds.find(item => item.round == round)
  if (roundData) {
    return roundData.startPlayer
  }
  return Player.PLAYER
}

function getPlayer(route: RouteLocation, startPlayer: Player) : Player {
  if (route.name == 'TurnPlayer') {
    return Player.PLAYER
  }
  else if (route.name == 'TurnBot') {
    return Player.BOT
  }
  else {
    return startPlayer
  }
}

function getBotPersistence(state: State, round: number, turn: number) : BotPersistence|undefined {
  const roundData = state.rounds.find(item => item.round == round)
  if (roundData) {
    const turnData = roundData.turns.find(item => item.turn == turn)
    return turnData?.botPersistence
  }
  return undefined
}

function getPreviousBotPersistence(state: State, round: number, turn: number) : BotPersistence {
  const roundData = state.rounds.find(item => item.round == round)
  if (roundData) {
    const lastBotPersistence = roundData.turns
        .filter(item => item.turn < turn)
        .toSorted((a,b) => a.turn - b.turn)
        .map(item => item.botPersistence)
        .find(item => item != undefined)
    if (lastBotPersistence) {
      return lastBotPersistence
    }
  }

  // check previous round
  if (round > 1) {
    return getPreviousBotPersistence(state, round - 1, MAX_TURN)
  }

  // get initial card deck
  let initialCardDeck = state.setup.initialCardDeck
  if (!initialCardDeck) {
    initialCardDeck = CardDeck.new().toPersistence()  // should never happen
  }
  return {
    cardDeck: initialCardDeck,
    evolutionCount: 0,
    prosperityCount: 0,
    actionRoll: 0,
    territoryRoll: 0,
    beaconRoll: 0
  }
}
