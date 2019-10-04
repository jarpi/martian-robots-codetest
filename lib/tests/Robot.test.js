const expect = require('chai').expect
const Robot = require('../src/Robot.js')

  describe('Robot/*', () => {
  it('should create a grid', async () => {
      const robotInstance = new Robot()
      expect(robotInstance.getGrid()).to.be.an('object')
      expect(robotInstance.getGrid().width).to.be.equal(0)
      expect(robotInstance.getGrid().height).to.be.equal(0)
  })

  it('should have position property', async () => {
      const robotInstance = new Robot()
      expect(robotInstance.getPosition()).to.be.an('object')
      expect(robotInstance.getPosition().x).to.be.equal(0)
      expect(robotInstance.getPosition().y).to.be.equal(0)
  })

  it('should have direction property', async () => {
    const robotInstance = new Robot()
    expect(robotInstance.getDirection()).to.be.an('string')
  })

})
