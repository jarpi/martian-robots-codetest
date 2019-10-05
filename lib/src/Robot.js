class Robot {
  constructor () {
    this.grid = { width: 0, height: 0 }
    this.position = { x: 0, y: 0 }
    this.orientation = 'N'
  }

  run (instructions) {
    const [gridSize, ...robotInstructions] = instructions.split('\n')
    const [width, height] = gridSize.split(' ')
    this.grid = { width: parseInt(width), height: parseInt(height) }
    const [x, y, orientation] = robotInstructions[0].split(' ')
    this.position = { x: parseInt(x), y: parseInt(y) }
    this.orientation = orientation
    const robotDirections = robotInstructions[1] ? robotInstructions[1].split('') : []
    robotDirections.forEach(direction => this.move(direction))
  }

  move (type) {
    if (type === 'F') {
      // Move forward
      // Check direction
      // N = Y + 1
      // S = Y - 1
      // E = X + 1
      // W = X - 1
      // Check if is a valid move
      // Make it die if it's not valid
      // Add / Substract if its valid
      if (this.orientation === 'N') {
        this.position.y += 1
      }
      if (this.orientation === 'S') {
        this.position.y -= 1
      }
      if (this.orientation === 'E') {
        this.position.x += 1
      }
      if (this.orientation === 'W') {
        this.position.x -= 1
      }
    }
    // Turning to any direction would mean to know what's the orientation when movin forward
    if (type === 'L') {
      // Turn counter clock wise 90
      const oldX = this.position.x
      this.position.x = -this.position.y
      this.position.y = oldX
    }
    if (type === 'R') {
      // Turn clockwise 90
      const oldX = this.position.x
      this.position.x = this.position.y
      this.position.y = -oldX
    }
  }

  getGrid () {
    return this.grid
  }

  getPosition () {
    return this.position
  }

  getOrientation () {
    return this.orientation
  }
}

module.exports = Robot
