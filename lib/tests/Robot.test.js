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

  it('should have orientation property', async () => {
    const robotInstance = new Robot()
    expect(robotInstance.getOrientation()).to.be.an('string')
  })

  it('should parse grid coordinates as an ordered pair of x,y', async () => {
    const robotInstance = new Robot()
    robotInstance.run('5 5\n')
    expect(robotInstance.getGrid().width).to.be.equal(5)
    expect(robotInstance.getGrid().height).to.be.equal(5)
  })

  it('should parse Robot initialization coordinates and orientation', async () => {
    const robotInstance = new Robot()
    robotInstance.run('5 5\n1 2 E\n')
    expect(robotInstance.getPosition().x).to.be.equal(1)
    expect(robotInstance.getPosition().y).to.be.equal(2)
    expect(robotInstance.getOrientation()).to.be.equal('E')
  })

  it('should parse Robot instructions', async () => {
    const robotInstance = new Robot()
    robotInstance.run('5 5\n1 2 N\nF')
    expect(robotInstance.getPosition().x).to.be.equal(1)
    expect(robotInstance.getPosition().y).to.be.equal(3)
  })

})
