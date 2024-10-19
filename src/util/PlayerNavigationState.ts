import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import AbstractNavigationState from './AbstractNavigationState'

export default class PlayerNavigationState extends AbstractNavigationState {

  constructor(route : RouteLocation, state : State) {
    super(route, state)
  }

}
