import Beacon from '@/services/enum/Beacon'
import getBeaconPriority from '@/util/getBeaconPriority'
import { expect } from 'chai'

describe('util/getBeaconPriority', () => {
  it('getBeaconPriority', () => {
    expect(getBeaconPriority(1)).to.eql([Beacon.BEACON_1,Beacon.BEACON_2,Beacon.BEACON_3])
    expect(getBeaconPriority(2)).to.eql([Beacon.BEACON_1,Beacon.BEACON_2,Beacon.BEACON_3])
    expect(getBeaconPriority(3)).to.eql([Beacon.BEACON_2,Beacon.BEACON_3,Beacon.BEACON_1])
    expect(getBeaconPriority(6)).to.eql([Beacon.BEACON_3,Beacon.BEACON_1,Beacon.BEACON_2])
  })
})
