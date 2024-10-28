import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'

/**
 * Manages the bot actions.
 */
export default class MapRandomizer {

  readonly _firstPlay : boolean
  private _tiles : TilePlacement[] = []
  
  public constructor(firstPlay : boolean) {
    this._firstPlay = firstPlay
  }

  public randomize() : void {
    let retryCount = 0
    while (retryCount < MAX_RETRIES) {
      this._tiles = []
      if (this._firstPlay) {
        this._tiles.push({ tile: MAP_TILES[0], x: 1, y: 1, rotation: Rotation.UP })
        this._tiles.push({ tile: MAP_TILES[1], x: 2, y: 0, rotation: Rotation.UP })
        this._tiles.push({ tile: MAP_TILES[2], x: 1, y: 2, rotation: Rotation.RIGHT })
      }
      let failed = false
      for (let i=this._firstPlay ? 3 : 0; i<MAP_TILES.length; i++) {
        const positions = this.findValidPositions(MAP_TILES[i])
        if (positions.length > 0) {
          const index = rollDice(positions.length) - 1
          this._tiles.push(positions[index])
        }
        else {
          failed = true
          break
        }
      }
      if (failed) {
        retryCount++
      }
      else {
        return
      }
    }
    throw new Error('Unable to find valid map composition.')
  }

  private findValidPositions(tile: MapTile) : TilePlacement[] {
    if (tile.length == 1) {
      return this.findValidPositions_1Length(tile)
    }
    else {
      return this.findValidPositions_2Length(tile)
    }
  }

  private findValidPositions_1Length(tile: MapTile) : TilePlacement[] {
    const positions : TilePlacement[] = []
    const matrix = getMatrix(this._tiles)
    for (let x=0; x<5; x++) {
      for (let y=0;y<3;y++) {
        if (!matrix[x][y]) {
          positions.push({ tile, x, y, rotation: Rotation.UP })
        }
      }
    }
    // increase probability to place tile A in center a bit
    for (let x=1; x<4; x++) {
      if (!matrix[x][1]) {
        positions.push({ tile, x, y:1, rotation: Rotation.UP })
        positions.push({ tile, x, y:1, rotation: Rotation.UP })
        positions.push({ tile, x, y:1, rotation: Rotation.UP })
      }
    }
    return positions
  }
  
  private findValidPositions_2Length(tile: MapTile) : TilePlacement[] {
    const positions : TilePlacement[] = []
    const matrix = getMatrix(this._tiles)
    // horizontal
    for (let x=0; x<4; x++) {
      for (let y=0;y<3;y++) {
        if (!matrix[x][y] && !matrix[x+1][y]) {
          positions.push({ tile, x, y, rotation: Rotation.RIGHT })
          positions.push({ tile, x, y, rotation: Rotation.LEFT })
        }
      }
    }
    // vertical
    for (let x=0; x<5; x++) {
      for (let y=0;y<2;y++) {
        if (!matrix[x][y] && !matrix[x][y+1]) {
          positions.push({ tile, x, y, rotation: Rotation.UP })
          positions.push({ tile, x, y, rotation: Rotation.DOWN })
        }
      }
    }
    return positions
  }
  
  public get tiles() : readonly TilePlacement[] {
    return this._tiles
  }

}

const MAX_RETRIES = 1000

const MAP_TILES : MapTile[] = [
  { name: 'a', length: 1 },
  { name: 'b', length: 2 },
  { name: 'c', length: 2 },
  { name: 'd', length: 2 },
  { name: 'e', length: 2 },
  { name: 'f', length: 2 },
  { name: 'g', length: 2 },
  { name: 'h', length: 2 },  
]

export interface MapTile {
  name: string
  length: number
}

export interface TilePlacement {
  tile: MapTile
  x: number
  y: number
  rotation: Rotation
}

export enum Rotation {
  UP = 0,
  RIGHT = 90,
  DOWN = 180,
  LEFT = 270
}

function getMatrix(tilePlacements : TilePlacement[]) : boolean[][] {
  const matrix : boolean[][] = []
  for (let x=0; x<5; x++) {
    matrix[x] = [false,false,false]
  }
  for (const tilePlacement of tilePlacements) {
    const { x1, x2, y1, y2 } = getCoordinates(tilePlacement)
    matrix[x1][y1] = true
    matrix[x1][y2] = true
    matrix[x2][y1] = true
    matrix[x2][y2] = true
  }
  return matrix
}

function getCoordinates(tilePlacement : TilePlacement) : { x1: number, x2: number, y1: number, y2: number } {
  const x1 = tilePlacement.x
  const y1 = tilePlacement.y
  let x2 = x1
  let y2 = y1
  if (tilePlacement.tile.length == 2) {
    if (tilePlacement.rotation == Rotation.LEFT || tilePlacement.rotation == Rotation.RIGHT) {
      x2 = x1 + 1
    }
    else {
      y2 = y2 + 1
    }
  }
  return { x1, x2, y1, y2 }
}
