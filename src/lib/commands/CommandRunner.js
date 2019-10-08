const NorthCommand = require('./CommandNorth.js')
const SouthCommand = require('./CommandSouth.js')
const EastCommand = require('./CommandEast.js')
const WestCommand = require('./CommandWest.js')
const TurnLeftCommand = require('./CommandTurnLeft.js')
const TurnRightCommand = require('./CommandTurnRight.js')

const commands = {
  F: {
    N: NorthCommand,
    S: SouthCommand,
    E: EastCommand,
    W: WestCommand
  },
  L: TurnLeftCommand,
  R: TurnRightCommand
}

class CommandRunner {
  execute (orientation, x, y, grid, lostPositions, type) {
    const command = type === 'F' ? commands[type][orientation.getValue()] : commands[type]
    return command.run(x, y, orientation, grid, lostPositions)
  }
}

module.exports = CommandRunner
