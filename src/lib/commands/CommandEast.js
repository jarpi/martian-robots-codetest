const isLost = (x, y, grid, lostPositions) => {
  if (x + 1 > 50) throw new Error('invalid_coordinate::X>50')
  if (x + 1 > grid.width) return true
  return false
}

const run = (x, y, orientation, grid, lostPositions) => {
  const isInvalidMove = isLost(x, y, grid)
  if (!isInvalidMove) return { x: x + 1, y, orientation, isInvalidMove }
  if (isInvalidMove && lostPositions[x + ':' + y]) return { x, y, orientation, isInvalidMove: false }
  return { x, y, orientation, isInvalidMove }
}

module.exports = {
  run
}
