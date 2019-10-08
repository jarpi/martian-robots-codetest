const run = (x, y, orientation, grid, lostPositions) => {
  return { x, y, orientation: orientation.getNext(), grid, lostPositions }
}

module.exports = {
  run
}
