const NorthCommand = require('./CommandNorth.js')

const commands = {
  N: NorthCommand
}

class CommandRunner {
  execute (orientation, x, y, grid, lostPositions) {
    const type = orientation.getValue()
    const command = commands[type]
    return command.getNextMove(x, y, orientation, grid, lostPositions)
  }
}

module.exports = CommandRunner
