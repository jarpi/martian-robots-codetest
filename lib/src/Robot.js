class Robot {

  constructor() {
    this.grid = {width:0, height:0}
    this.position = {x:0, y:0}
    this.direction = 'N'
  }

  run(instructions) {}

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
