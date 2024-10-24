import { createTerritoryRoll } from '@/util/TerritoryRoll'
import { expect } from 'chai'

describe('util/TerritoryRoll', () => {
  it('createTerritoryRoll', () => {
    const territoryRoll = createTerritoryRoll()
    expect(territoryRoll.territoryRoll).to.greaterThanOrEqual(1)
    expect(territoryRoll.beaconRoll).to.greaterThanOrEqual(1)
  })
})
