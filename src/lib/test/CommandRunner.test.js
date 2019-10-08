const expect = require('chai').expect
const CommandRunner = require('../commands/CommandRunner.js')

describe('Commands/', () => {
  describe('CommandRunner', () => {
    it('should work for an existing command', async () => {
      const commandRunnerInstance = new CommandRunner()
      const result = commandRunnerInstance.execute({
        getPrevious: _ => 'W'
      }, 0, 0, { widht: 1, height: 1 }, {}, 'L')
      expect(result.orientation).to.be.equal('W')
    })

    it('should throw error for unexisting command', async () => {
      const commandRunnerInstance = new CommandRunner()
      try {
        commandRunnerInstance.execute({
          getPrevious: _ => 'W'
        }, 0, 0, { widht: 1, height: 1 }, {}, 'T')
      } catch (e) {
        expect(e.message).to.be.equal('command_runner::execute::invalidCommand')
      }
    })
  })
})
