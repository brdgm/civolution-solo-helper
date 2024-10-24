import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'

/**
 * Territory + beacon roll.
 */
export default interface TerritoryRoll {
  territoryRoll: number
  beaconRoll: number
}

export function createTerritoryRoll() : TerritoryRoll {
  return {
    territoryRoll: rollDice(6),
    beaconRoll: rollDice(6)
  }
}
