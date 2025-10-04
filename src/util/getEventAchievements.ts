/**
 * Derives event achievements from gained prosperity markers.
 * @param prosperityMarkerCount Number of prosperity markers
 * @returns Event achievements
 */
export default function getEventAchievements(prosperityMarkerCount : number) : EventAchievement[] {
  return EVENT_THRESHOLDS.map(({ event, thresholds }) =>
      ({ event, count: countThresholds(prosperityMarkerCount, thresholds)}))
}

export interface EventAchievement {
  event: string
  count: number
}

const ROW_B = [2,6,10,14]
const ROW_C = [3,7,11,15]
const ROW_D = [4,8,12,16]

const EVENT_THRESHOLDS = [
  { event: 'F4', thresholds: [4,8,12] },
  { event: 'F6', thresholds: [...ROW_B,...ROW_C] },
  { event: 'F16', thresholds: [...ROW_C,...ROW_D] },
  { event: 'F17', thresholds: [...ROW_B,...ROW_D] },
  { event: 'F19', thresholds: [...ROW_B,...ROW_C,...ROW_D] },
  { event: 'F20', thresholds: [4,10] }
]

function countThresholds(prosperityMarkerCount : number, thresholds : number[]) : number {
  return thresholds.filter(threshold => prosperityMarkerCount >= threshold).length
}
