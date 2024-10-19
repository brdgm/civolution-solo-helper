import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import AbstractNavigationState from './AbstractNavigationState'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'

export default class PlayerNavigationState extends AbstractNavigationState {

  readonly player : number

  constructor(route : RouteLocation, state : State) {
    super(route, state)
    this.player = getIntRouteParam(route, 'player')
  }

}
