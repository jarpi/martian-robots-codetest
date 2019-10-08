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
  execute (orientation, x, y, grid, lostPositions, type, subtype) {
    const command = this.isSubCommand(type, subtype) ? commands[type][subtype] : commands[type]
    if (!command) throw new Error('command_runner::execute::invalidCommand')
    return command.run(x, y, orientation, grid, lostPositions)
  }

  isSubCommand (type, subtype) {
    return commands[type] && commands[type][subtype]
  }
}

module.exports = CommandRunner
