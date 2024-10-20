import Beacon from "@/services/enum/Beacon"

/**
 * Gets prioritized beacons.
 * @param beaconRoll Beacon roll
 * @returns Beacon list
 */
export default function(beaconRoll : number) : Beacon[] {
  const splitIndex = Math.floor((beaconRoll - 1) / 2)
  return BEACON_PRIORITY.slice(splitIndex).concat(BEACON_PRIORITY.slice(0, splitIndex))
}

const BEACON_PRIORITY = [
  Beacon.BEACON_1,
  Beacon.BEACON_2,
  Beacon.BEACON_3,
]
