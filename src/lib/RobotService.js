const DoubleLinkedList = require('./utils/DoubleLinkedList')
const CommandRunner = require('./commands/CommandRunner.js')
const RobotInstructionParserService = require('./RobotInstructionsParserService.js')
const RobotReporterService = require('./RobotReporterService.js')

class RobotService {
  constructor () {
    this.grid = { width: 0, height: 0 }
    this.position = { x: 0, y: 0 }
    this.orientation = new DoubleLinkedList('N', null, null).append('E').append('S').append('W')
    this.isLost = false
    this.lostPositions = {}
    this.commandRunner = new CommandRunner()
  }

  run (instructions) {
    const robotReporterService = new RobotReporterService()
    const robotInstructionParserServiceInstance = new RobotInstructionParserService()
    robotInstructionParserServiceInstance.parse(instructions)
    if (robotInstructionParserServiceInstance.getRobotInitInstructions().length !==
        robotInstructionParserServiceInstance.getRobotCommands().length) return
    if (robotInstructionParserServiceInstance.getGrid().width < 0) {
      throw new Error('invalid_grid_coordinate::WIDTH')
    }
    if (robotInstructionParserServiceInstance.getGrid().height < 0) {
      throw new Error('invalid_grid_coordinate::HEIGHT')
    }
    this.grid = robotInstructionParserServiceInstance.getGrid()
    robotInstructionParserServiceInstance.getRobotInitInstructions().forEach((c, i) => {
      const [x, y, orientation] = robotInstructionParserServiceInstance.getRobotInitCommand(c)
      if (x < 0 || x > this.grid.width || x > 50) {
        throw new Error('unexisting_coordinate::X')
      }
      if (y < 0 || y > this.grid.height || x > 50) {
        throw new Error('unexisting_coordinate::Y')
      }
      this.position = { x: parseInt(x), y: parseInt(y) }
      this.orientation = (orientation ? this.orientation.getNodeByData(orientation) : this.orientation)
      robotInstructionParserServiceInstance.getRobotCommands()[i].split('')
        .forEach(instruction => {
          try {
            this.move(instruction)
          } catch (e) {
            if (e.message === 'command_runner::execute::invalidCommand') {
              throw new Error(`unexisting_command::${instruction}`)
            } else {
              throw e
            }
          }
        })
      robotReporterService.add(`${this.getPosition().x} ${this.getPosition().y} ${this.getOrientation()}` + (this.isLost ? ' LOST' : ''))
      this.isLost = false
    })
    return robotReporterService.get('\n')
  }

  move (type) {
    if (this.isLost) return
    const result = this.commandRunner.execute(
      this.orientation,
      this.position.x,
      this.position.y,
      this.grid,
      this.lostPositions,
      type,
      this.orientation.getValue()
    )
    if (result.isInvalidMove) {
      this.lostPositions[this.position.x + ':' + this.position.y] = true
    }
    this.position.x = result.x
    this.position.y = result.y
    this.orientation = result.orientation
    this.isLost = result.isInvalidMove
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

module.exports = RobotService
