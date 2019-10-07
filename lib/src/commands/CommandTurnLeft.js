const run = (x, y, orientation, grid, lostPositions) => {
  return { x, y, orientation: orientation.getPrevious(), grid, lostPositions }
}

module.exports = {
  run
}
