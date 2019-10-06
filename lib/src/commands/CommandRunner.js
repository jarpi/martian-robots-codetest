const NorthCommand = require('./CommandNorth.js')

const commands = {
  N: NorthCommand
}

class CommandRunner {
  execute (orientation, x, y, grid, lostPositions) {
    const type = orientation.getValue()
    const command = commands[type]
    const isLost = command.isLost(x, y, grid, lostPositions)
    if (isLost) {
      console.dir('***************')
      console.dir(isLost)
      return { x, y, orientation, isLost }
    }
    console.dir(command)
    return command.getNextMove(x, y, orientation, isLost)
  }
}

module.exports = CommandRunner
