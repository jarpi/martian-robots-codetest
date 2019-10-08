const expect = require('chai').expect
const RobotService = require('../RobotService.js')

describe('Robot/*', () => {
  it('should create a grid', async () => {
    const robotInstance = new RobotService()
    expect(robotInstance.getGrid()).to.be.an('object')
    expect(robotInstance.getGrid().width).to.be.equal(0)
    expect(robotInstance.getGrid().height).to.be.equal(0)
  })

  it('should have position property', async () => {
    const robotInstance = new RobotService()
    expect(robotInstance.getPosition()).to.be.an('object')
    expect(robotInstance.getPosition().x).to.be.equal(0)
    expect(robotInstance.getPosition().y).to.be.equal(0)
  })

  it('should have orientation property', async () => {
    const robotInstance = new RobotService()
    expect(robotInstance.getOrientation()).to.be.an('string')
  })

  it('should parse grid coordinates as an ordered pair of x,y', async () => {
    const robotInstance = new RobotService()
    robotInstance.run('5 5\n')
    expect(robotInstance.getGrid().width).to.be.equal(5)
    expect(robotInstance.getGrid().height).to.be.equal(5)
  })

  it('should not parse Robot initialization coordinates and orientation when no command', async () => {
    const robotInstance = new RobotService()
    robotInstance.run('5 5\n1 2 E\n')
    expect(robotInstance.getPosition().x).to.be.equal(0)
    expect(robotInstance.getPosition().y).to.be.equal(0)
    expect(robotInstance.getOrientation()).to.be.equal('N')
  })

  it('should parse Robot initialization coordinates and orientation', async () => {
    const robotInstance = new RobotService()
    robotInstance.run('5 5\n1 2 E\nF')
    expect(robotInstance.getPosition().x).to.be.equal(2)
    expect(robotInstance.getPosition().y).to.be.equal(2)
    expect(robotInstance.getOrientation()).to.be.equal('E')
  })

  it('should move FORWARD', async () => {
    const robotInstance = new RobotService()
    robotInstance.run('5 5\n1 2 N\nF')
    expect(robotInstance.getPosition().x).to.be.equal(1)
    expect(robotInstance.getPosition().y).to.be.equal(3)
  })

  it('should turn RIGHT', async () => {
    const robotInstance = new RobotService()
    robotInstance.run('5 5\n1 2 N\nR')
    expect(robotInstance.getPosition().x).to.be.equal(1)
    expect(robotInstance.getPosition().y).to.be.equal(2)
    expect(robotInstance.getOrientation()).to.be.equal('E')
  })

  it('should turn LEFT', async () => {
    const robotInstance = new RobotService()
    robotInstance.run('5 5\n1 2 N\nL')
    expect(robotInstance.getPosition().x).to.be.equal(1)
    expect(robotInstance.getPosition().y).to.be.equal(2)
    expect(robotInstance.getOrientation()).to.be.equal('W')
  })

  it('orientation facing NORTH should be WEST when turning LEFT', async () => {
    const robotInstance = new RobotService()
    robotInstance.run('5 5\n1 2 N\nL')
    expect(robotInstance.getOrientation()).to.be.equal('W')
  })

  it('orientation facing WEST should be SOUTH when turning LEFT', async () => {
    const robotInstance = new RobotService()
    robotInstance.run('5 5\n1 2 W\nL')
    expect(robotInstance.getOrientation()).to.be.equal('S')
  })

  it('orientation facing SOUTH should be EAST when turning LEFT', async () => {
    const robotInstance = new RobotService()
    robotInstance.run('5 5\n1 2 S\nL')
    expect(robotInstance.getOrientation()).to.be.equal('E')
  })

  it('orientation facing EAST should be NORTH when turning LEFT', async () => {
    const robotInstance = new RobotService()
    robotInstance.run('5 5\n1 2 E\nL')
    expect(robotInstance.getOrientation()).to.be.equal('N')
  })

  it('orientation facing NORTH should be EAST when turning RIGHT', async () => {
    const robotInstance = new RobotService()
    robotInstance.run('5 5\n1 2 N\nR')
    expect(robotInstance.getOrientation()).to.be.equal('E')
  })

  it('orientation facing EAST should be SOUTH when turning RIGHT', async () => {
    const robotInstance = new RobotService()
    robotInstance.run('5 5\n1 2 E\nR')
    expect(robotInstance.getOrientation()).to.be.equal('S')
  })

  it('orientation facing SOUTH should be WEST when turning RIGHT', async () => {
    const robotInstance = new RobotService()
    robotInstance.run('5 5\n1 2 S\nR')
    expect(robotInstance.getOrientation()).to.be.equal('W')
  })

  it('orientation facing WEST should be NORTH when turning RIGHT', async () => {
    const robotInstance = new RobotService()
    robotInstance.run('5 5\n1 2 W\nR')
    expect(robotInstance.getOrientation()).to.be.equal('N')
  })

  it('5 3 - 1 1 E - RFRFRFRF = 1 1 E', async () => {
    const robotInstance = new RobotService()
    robotInstance.run('5 3\n1 1 E\nRFRFRFRF')
    expect(robotInstance.getPosition().x).to.be.equal(1)
    expect(robotInstance.getPosition().y).to.be.equal(1)
    expect(robotInstance.getOrientation()).to.be.equal('E')
  })

  it('5 3 - 3 2 N - FRRFLLFFRRFLL = 3 3 N', async () => {
    const robotInstance = new RobotService()
    robotInstance.run('5 3\n3 2 N\nFRRFLLFFRRFLL')
    expect(robotInstance.getPosition().x).to.be.equal(3)
    expect(robotInstance.getPosition().y).to.be.equal(3)
    expect(robotInstance.getOrientation()).to.be.equal('N')
  })

  it('5 3 - 0 3 W - LLFFFLFLFL = 2 3 S', async () => {
    const robotInstance = new RobotService()
    robotInstance.run('5 3\n0 3 W\nLLFFFLFLFL')
    expect(robotInstance.getPosition().x).to.be.equal(3)
    expect(robotInstance.getPosition().y).to.be.equal(3)
    expect(robotInstance.getOrientation()).to.be.equal('N')
  })

  it('Handle multiple robots', async () => {
    const robotInstance = new RobotService()
    const result = robotInstance.run('5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL')
    expect(result).to.be.equal('1 1 E\n3 3 N LOST')
  })

  it('Handle multiple robots and preserve scent of the fallen', async () => {
    const robotInstance = new RobotService()
    const result = robotInstance.run('5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL')
    expect(result).to.be.equal('1 1 E\n3 3 N LOST\n2 3 S')
  })

  it('should throw error for unexisting command', done => {
    const robotInstance = new RobotService()
    try {
      robotInstance.run('5 3\n1 1 E\nT')
      done(new Error('catch not reached'))
    } catch (e) {
      expect(e.message).to.be.equal('unexisting_command:T')
      done()
    }
  })

  it('should throw error for unexisting coordinate X', done => {
    const robotInstance = new RobotService()
    try {
      robotInstance.run('5 3\n6 1 E\nL')
      done(new Error('catch not reached'))
    } catch (e) {
      expect(e.message).to.be.equal('unexisting_coordinate:X')
      done()
    }
  })

  it('should throw error for unexisting coordinate Y', done => {
    const robotInstance = new RobotService()
    try {
      robotInstance.run('5 3\n1 4 E\nL')
      done(new Error('catch not reached'))
    } catch (e) {
      expect(e.message).to.be.equal('unexisting_coordinate:Y')
      done()
    }
  })

  it('should throw error for unexisting orientation', done => {
    const robotInstance = new RobotService()
    try {
      robotInstance.run('5 3\n1 1 U\nL')
      done(new Error('catch not reached'))
    } catch (e) {
      expect(e.message).to.be.equal('unexisting_node::U')
      done()
    }
  })

  it('should throw error for negative coordinates for grid', done => {
    const robotInstance = new RobotService()
    try {
      robotInstance.run('-5 3\n1 1 E\nL')
    } catch (e) {
      expect(e.message).to.be.equal('invalid_grid_coordinate::WIDTH')
      done()
    }
  })

  it('should throw error for negative coordinates for grid', done => {
    const robotInstance = new RobotService()
    try {
      robotInstance.run('5 -3\n1 1 E\nL')
      done(new Error('catch not reached'))
    } catch (e) {
      expect(e.message).to.be.equal('invalid_grid_coordinate::HEIGHT')
      done()
    }
  })
})
