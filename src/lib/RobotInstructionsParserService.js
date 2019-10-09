/*
  @param instructions format ...
  @return {} ...
*/
class RobotInstructionParserService {
  constructor () {
    this.grid = {}
    this.robotInitInstructions = []
    this.robotCommands = []
  }

  parse (instructions) {
    const [gridSize, ...robotInstructions] = instructions.split('\n')
      .filter(e => e !== '')
    const [width, height] = gridSize.split(' ')
    this.grid = {
      width: parseInt(width),
      height: parseInt(height)
    }
    this.robotInitInstructions = robotInstructions.filter((e, i) => i % 2 === 0)
    this.robotCommands = robotInstructions.filter((e, i) => i % 2 === 1)
  }

  getGrid () {
    return this.grid
  }

  getRobotInitInstructions () {
    return this.robotInitInstructions
  }

  getRobotCommands () {
    return this.robotCommands
  }

  getRobotInitCommand (values) {
    const [x, y, orientation] = values.split(' ')
    return [{ x: parseInt(x), y: parseInt(y) }, orientation]
  }
}

module.exports = RobotInstructionParserService
