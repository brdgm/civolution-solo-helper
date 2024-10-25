import getEventAchievements from '@/util/getEventAchievements'
import { expect } from 'chai'

describe('util/getEventAchievements.spec', () => {
  it('0', () => {
    expect(getEventAchievements(0)).to.eql([
      { event: 'F4', count: 0 },
      { event: 'F6', count: 0 },
      { event: 'F16', count: 0 },
      { event: 'F17', count: 0 },
      { event: 'F19', count: 0 },
      { event: 'F20', count: 0 }
    ])
  })

  it('7', () => {
    expect(getEventAchievements(7)).to.eql([
      { event: 'F4', count: 1 },
      { event: 'F6', count: 4 },
      { event: 'F16', count: 3 },
      { event: 'F17', count: 3 },
      { event: 'F19', count: 5 },
      { event: 'F20', count: 1 }
    ])
  })

  it('16', () => {
    expect(getEventAchievements(16)).to.eql([
      { event: 'F4', count: 3 },
      { event: 'F6', count: 8 },
      { event: 'F16', count: 8 },
      { event: 'F17', count: 8 },
      { event: 'F19', count: 12 },
      { event: 'F20', count: 2 }
    ])
  })
})
