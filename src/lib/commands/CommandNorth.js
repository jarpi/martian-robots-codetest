const isLost = (x, y, grid, lostPositions) => {
  if (y + 1 > grid.height) return true
  return false
}

const run = (x, y, orientation, grid, lostPositions) => {
  const isInvalidMove = isLost(x, y, grid)
  if (!isInvalidMove) return { x, y: y + 1, orientation, isInvalidMove }
  if (isInvalidMove && lostPositions[x + ':' + y]) return { x, y, orientation, isInvalidMove: false }
  if (isInvalidMove) {
    lostPositions[x + ':' + y] = true
    return { x, y, orientation, isInvalidMove }
  }
}

module.exports = {
  run
}