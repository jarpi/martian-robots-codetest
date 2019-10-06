class Robot {
  constructor () {
    this.grid = { width: 0, height: 0 }
    this.position = { x: 0, y: 0 }
    this.orientation = new DoubleLinkedList('N', null, null).append('E').append('S').append('W')
    this.isLost = false
  }

  run (instructions) {
    const [gridSize, ...robotInstructions] = instructions.split('\n')
    const [width, height] = gridSize.split(' ')
    this.grid = { width: parseInt(width), height: parseInt(height) }
    const [x, y, orientation] = robotInstructions[0].split(' ')
    this.position = { x: parseInt(x), y: parseInt(y) }
    this.orientation = (orientation ? this.orientation.getNodeByData(orientation) : this.orientation)
    const robotDirections = robotInstructions[1] ? robotInstructions[1].split('') : []
    robotDirections.forEach(direction => this.move(direction))
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
        if (this.position.y + 1 > this.grid.height) {
          this.isLost = true
          return
        }
        this.position.y += 1
      }
      if (this.orientation.getValue() === 'S') {
        if (this.position.y - 1 < 0) {
          this.isLost = true
          return
        }
        this.position.y -= 1
      }
      if (this.orientation.getValue() === 'E') {
        if (this.position.x + 1 > this.grid.width) {
          this.isLost = true
          return
        }
        this.position.x += 1
      }
      if (this.orientation.getValue() === 'W') {
        if (this.position.x - 1 < 0) {
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

class DoubleLinkedList {
  constructor (data, next, previous) {
    this.data = data
    this.next = next
    this.previous = previous
    this.lastNode = this
  }

  append (data) {
    this.lastNode.next = new DoubleLinkedList(data, this, this.lastNode)
    this.previous = this.lastNode.next
    this.lastNode = this.lastNode.next
    return this
  }

  getValue () {
    return this.data
  }

  getNext () {
    return this.next
  }

  getPrevious () {
    return this.previous
  }

  getNodeByData (value) {
    let node = this
    while (node.data !== value) {
      node = node.getNext()
    }
    return node
  }
}
