class Robot {

  constructor() {
    this.grid = {width:0, height:0}
    this.position = {x:0, y:0}
    this.direction = 'N'
  }

  run(instructions) {
    let [gridSize, robotInstructions] = instructions.split('\n')
    let [width, height] = gridSize.split(' ')
    this.grid = {width: parseInt(width), height: parseInt(height)}
  }

  getGrid() {
    return this.grid
  }

  getPosition() {
    return this.position
  }

  getDirection() {
    return this.direction
  }

}

module.exports = Robot
