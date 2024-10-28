import { expect } from 'chai'
import MapRandomizer from '@/services/MapRandomizer'

describe('services/MapRandomizer', () => {
  it('randomizeFirstPlay', () => {
    const mapRandomizer = new MapRandomizer(true)
    mapRandomizer.randomize()
    expect(mapRandomizer.tiles.length).to.eq(8)
  })

  it('randomize', () => {
    const mapRandomizer = new MapRandomizer(false)
    mapRandomizer.randomize()
    expect(mapRandomizer.tiles.length).to.eq(8)
  })
})
