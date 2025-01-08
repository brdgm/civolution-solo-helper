import NavigationState from '@/util/NavigationState'
import { expect } from 'chai'
import mockRouteLocation from '../helper/mockRouteLocation'
import mockState from '../helper/mockState'
import Player from '@/services/enum/Player'
import mockRound from '../helper/mockRound'
import mockTurn from '../helper/mockTurn'

const stateBotData = mockState({initialCardDeck:{pile:[1,2,3,4],discard:[]}, rounds:[
  mockRound({round:1, turns:[
    mockTurn({round:1,turn:1,player:Player.PLAYER}),
    mockTurn({round:1,turn:2,player:Player.BOT,cardDeck:{pile:[2,3,4],discard:[1]}}),
    mockTurn({round:1,turn:3,player:Player.PLAYER}),
    mockTurn({round:1,turn:4,player:Player.BOT,cardDeck:{pile:[3,4],discard:[2,1]},
        evolutionCount:2, prosperityCount:1, blueDotCount:3, redDotCount:1, actionRoll:3})
  ]})
]})

describe('util/NavigationState', () => {
  it('roundStart', () => {
    const route = mockRouteLocation({name:'RoundStart', params:{round:'1'}})
    const state = mockState()
    const navigationState = new NavigationState(route, state)

    expect(navigationState.player).to.eq(Player.PLAYER)
    expect(navigationState.round).to.eq(1)
    expect(navigationState.turn).to.eq(0)
  })

  it('turnPlayer', () => {
    const route = mockRouteLocation({name:'TurnPlayer', params:{round:'1',turn:'3'}})
    const state = mockState()
    const navigationState = new NavigationState(route, state)

    expect(navigationState.player).to.eq(Player.PLAYER)
    expect(navigationState.round).to.eq(1)
    expect(navigationState.turn).to.eq(3)
  })

  it('roundEnd', () => {
    const route = mockRouteLocation({name:'RoundEnd', params:{round:'1'}})
    const state = mockState()
    const navigationState = new NavigationState(route, state)

    expect(navigationState.player).to.eq(Player.PLAYER)
    expect(navigationState.round).to.eq(1)
    expect(navigationState.turn).to.eq(999)
  })

  it('gameEnd', () => {
    const route = mockRouteLocation({name:'GameEnd'})
    const state = mockState()
    const navigationState = new NavigationState(route, state)

    expect(navigationState.player).to.eq(Player.PLAYER)
    expect(navigationState.round).to.eq(4)
    expect(navigationState.turn).to.eq(999)
  })

  it('startPlayer', () => {
    const route = mockRouteLocation({name:'TurnBot', params:{round:'1',turn:'3'}})
    const state = mockState({rounds:[
      mockRound({round:1,startPlayer:Player.BOT})
    ]})
    const navigationState = new NavigationState(route, state)

    expect(navigationState.player).to.eq(Player.BOT)
    expect(navigationState.round).to.eq(1)
    expect(navigationState.turn).to.eq(3)
  })

  it('turnBot-currentTurn', () => {
    const route = mockRouteLocation({name:'TurnBot', params:{round:'1',turn:'4'}})
    const navigationState = new NavigationState(route, stateBotData)

    expect(navigationState.player).to.eq(Player.BOT)
    expect(navigationState.cardDeck.toPersistence()).to.eql({pile:[3,4],discard:[2,1]})
    expect(navigationState.evolutionCount).to.eq(2)
    expect(navigationState.prosperityCount).to.eq(1)
    expect(navigationState.blueDotCount).to.eq(3)
    expect(navigationState.redDotCount).to.eq(1)
    expect(navigationState.actionRoll).to.eq(3)
  })

  it('turnBot-lastTurn', () => {
    const route = mockRouteLocation({name:'TurnBot', params:{round:'1',turn:'6'}})
    const navigationState = new NavigationState(route, stateBotData)

    expect(navigationState.player).to.eq(Player.BOT)
    expect(navigationState.cardDeck.toPersistence()).to.eql({pile:[4],discard:[3,2,1]})
    expect(navigationState.evolutionCount).to.eq(2)
    expect(navigationState.prosperityCount).to.eq(1)
    expect(navigationState.blueDotCount).to.eq(5)  // card3.blueDotCount = 2
    expect(navigationState.redDotCount).to.eq(2)   // card3.redDotCount = 1
    expect(navigationState.actionRoll).to.greaterThanOrEqual(1)
  })

  it('turnBot-lastRoundLastTurn', () => {
    const route = mockRouteLocation({name:'TurnBot', params:{round:'2',turn:'1'}})
    const navigationState = new NavigationState(route, stateBotData)

    expect(navigationState.player).to.eq(Player.BOT)
    expect(navigationState.cardDeck.toPersistence()).to.eql({pile:[4],discard:[3,2,1]})
    expect(navigationState.evolutionCount).to.eq(2)
    expect(navigationState.prosperityCount).to.eq(1)
    expect(navigationState.blueDotCount).to.eq(5)  // taken over from last round
    expect(navigationState.redDotCount).to.eq(2)   // taken over from last round
    expect(navigationState.actionRoll).to.greaterThanOrEqual(1)
  })

  it('turnBot-initialCardDeck', () => {
    const route = mockRouteLocation({name:'TurnPlayer', params:{round:'1',turn:'1'}})
    const navigationState = new NavigationState(route, stateBotData)

    expect(navigationState.player).to.eq(Player.PLAYER)
    expect(navigationState.cardDeck.toPersistence()).to.eql({pile:[1,2,3,4],discard:[]})
    expect(navigationState.evolutionCount).to.eq(2)
    expect(navigationState.prosperityCount).to.eq(2)
    expect(navigationState.blueDotCount).to.eq(0)
    expect(navigationState.redDotCount).to.eq(0)
    expect(navigationState.actionRoll).to.eq(0)
  })
})
