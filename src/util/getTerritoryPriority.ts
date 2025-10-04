import Territory from '@/services/enum/Territory'

/**
 * Gets prioritized lists of territories.
 * @param territoryRoll Territory roll
 * @returns List of territories
 */
export default function getTerritoryPriority(territoryRoll : number) : Territory[] {
  const splitIndex = territoryRoll - 1
  return TERRITORY_PRIORITY.slice(splitIndex).concat(TERRITORY_PRIORITY.slice(0, splitIndex))
}

const TERRITORY_PRIORITY = [
  Territory.FOREST,
  Territory.SWAMP,
  Territory.MOUNTAINS,
  Territory.GRASSLAND,
  Territory.HILLS,
  Territory.DESERT
]
