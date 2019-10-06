const isLost = (x, y, grid, lostPositions) => {
  console.dir(grid.height)
  console.dir(y)
  if (y + 1 > grid.height) {
    if (lostPositions[x + ':' + y]) {
      return false
    }
    lostPositions[x + ':' + y] = true
    return true
  }
  return false
}

const getNextMove = (x, y, orientation) => {
  return { x: x, y: y + 1, orientation: orientation }
}

module.exports = {
  isLost: isLost,
  getNextMove: getNextMove
}
