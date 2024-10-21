import Territory from '@/services/enum/Territory'
import getTerritoryPriority from '@/util/getTerritoryPriority'
import { expect } from 'chai'

describe('util/getTerritoryPriority', () => {
  it('getTerritoryPriority', () => {
    expect(getTerritoryPriority(1)).to.eql([Territory.FOREST,Territory.SWAMP,Territory.MOUNTAINS,Territory.GRASSLAND,Territory.HILLS,Territory.DESERT])
    expect(getTerritoryPriority(2)).to.eql([Territory.SWAMP,Territory.MOUNTAINS,Territory.GRASSLAND,Territory.HILLS,Territory.DESERT,Territory.FOREST])
    expect(getTerritoryPriority(5)).to.eql([Territory.HILLS,Territory.DESERT,Territory.FOREST,Territory.SWAMP,Territory.MOUNTAINS,Territory.GRASSLAND])
    expect(getTerritoryPriority(6)).to.eql([Territory.DESERT,Territory.FOREST,Territory.SWAMP,Territory.MOUNTAINS,Territory.GRASSLAND,Territory.HILLS])
  })
})
