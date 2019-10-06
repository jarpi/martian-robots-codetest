const DoubleLinkedList = require('./utils/DoubleLinkedList')
const CommandRunner = require('./commands/CommandRunner.js')

class Robot {
  constructor () {
    this.grid = { width: 0, height: 0 }
    this.position = { x: 0, y: 0 }
    this.orientation = new DoubleLinkedList('N', null, null).append('E').append('S').append('W')
    this.isLost = false
    this.lostPositions = {}
    this.commandRunner = new CommandRunner()
  }

  run (instructions) {
    const [gridSize, ...robotInstructions] = instructions.split('\n')
    const [width, height] = gridSize.split(' ')
    this.grid = { width: parseInt(width), height: parseInt(height) }
    const robotInstructionsInit = robotInstructions.filter((e, i) => i % 2 === 0)
    const robotInstructionsCommands = robotInstructions.filter((e, i) => i % 2 === 1)
    if (robotInstructionsInit.length !== robotInstructionsCommands.length) return
    const robotReporter = []
    robotInstructionsInit.forEach((c, i) => {
      const [x, y, orientation] = c.split(' ')
      this.position = { x: parseInt(x), y: parseInt(y) }
      this.orientation = (orientation ? this.orientation.getNodeByData(orientation) : this.orientation)
      const robotMoves = robotInstructionsCommands[i].split('')
      robotMoves.forEach(instruction => {
        this.move(instruction)
      })
      robotReporter.push('' + this.getPosition().x + ' ' + this.getPosition().y + ' ' + this.getOrientation() + (this.isLost ? ' LOST' : ''))
      this.isLost = false
    })
    return robotReporter.join('\n')
  }

  move (type) {
    if (this.isLost) return
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
      if (this.orientation.getValue() === 'N') {
        const result = this.commandRunner.execute(
          this.orientation,
          this.position.x,
          this.position.y,
          this.grid,
          this.lostPositions
        )
        this.position.x = result.x
        this.position.y = result.y
        this.orientation = result.orientation
        this.isLost = result.isLost
        /* if (this.position.y + 1 > this.grid.height) {
          if (this.lostPositions[this.position.x + ':' + this.position.y]) {
            return
          }
          this.lostPositions[this.position.x + ':' + this.position.y] = true
          this.isLost = true
          return
        }
        this.position.y += 1 */
      }
      if (this.orientation.getValue() === 'S') {
        if (this.position.y - 1 < 0) {
          if (this.lostPositions[this.position.x + ':' + this.position.y]) {
            return
          }
          this.lostPositions[this.position.x + ':' + this.position.y] = true
          this.isLost = true
          return
        }
        this.position.y -= 1
      }
      if (this.orientation.getValue() === 'E') {
        if (this.position.x + 1 > this.grid.width) {
          if (this.lostPositions[this.position.x + ':' + this.position.y]) {
            return
          }
          this.lostPositions[this.position.x + ':' + this.position.y] = true
          this.isLost = true
          return
        }
        this.position.x += 1
      }
      if (this.orientation.getValue() === 'W') {
        if (this.position.x - 1 < 0) {
          if (this.lostPositions[this.position.x + ':' + this.position.y]) {
            return
          }
          this.lostPositions[this.position.x + ':' + this.position.y] = true
          this.isLost = true
          return
        }
        this.position.x -= 1
      }
    }
    // Turning to any direction would mean to know what's the orientation when movin forward
    if (type === 'L') {
      // Turn counter clock wise 90
      this.orientation = this.orientation.getPrevious()
    }
    if (type === 'R') {
      // Turn clockwise 90
      this.orientation = this.orientation.getNext()
    }
  }

  getGrid () {
    return this.grid
  }

  getPosition () {
    return this.position
  }

  getOrientation () {
    return this.orientation.getValue()
  }
}

module.exports = Robot
