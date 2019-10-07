const expect = require('chai').expect
const NorthCommand = require('../src/commands/CommandNorth.js')
const SouthCommand = require('../src/commands/CommandSouth.js')
const EastCommand = require('../src/commands/CommandEast.js')
const WestCommand = require('../src/commands/CommandWest.js')
const TurnLeftCommand = require('../src/commands/CommandTurnLeft.js')
const TurnRightCommand = require('../src/commands/CommandTurnRight.js')

describe('Commands/', () => {
  describe('Forward', () => {
    describe('North', async () => {
      it('valid coordinates should return increment for Y', async () => {
        const result = NorthCommand.run(
          0, 
          0, 
          {}, 
          { width: 5, height: 3}, 
          {})
        expect(result.y).to.be.equal(1)
      })

      it('invalid coordinates should update lostPositions', async () => {
        const orientation = {}
        const lostPositions = {}
        const result = NorthCommand.run(
          0, 
          0, 
          orientation, 
          { width: 5, height: 0}, 
          lostPositions)
        expect(result.x).to.be.equal(0)
        expect(result.y).to.be.equal(0)
        expect(result.orientation).to.be.equal(orientation)
        expect(result.isInvalidMove).to.be.equal(true)
        expect(lostPositions['0:0']).to.be.equal(true)
      })
      
      it('invalid coordinates existing in lostPositions should return input params', async () => {
        const orientation = {}
        const lostPositions = {'0:0': true}
        const result = NorthCommand.run(
          0, 
          0, 
          orientation, 
          { width: 5, height: 0}, 
          lostPositions)
        expect(result.x).to.be.equal(0)
        expect(result.y).to.be.equal(0)
        expect(result.orientation).to.be.equal(orientation)
        expect(result.isInvalidMove).to.be.equal(false)
        expect(lostPositions['0:0']).to.be.equal(true)
      })
    })

    describe('South', async () => {
      it('valid coordinates should return decrement for Y', async () => {
        const result = SouthCommand.run(
          0,
          1,
          {},
          { width: 5, height: 3}, 
          {})
        expect(result.y).to.be.equal(0)
      })

      it('invalid coordinates should update lostPositions', async () => {
        const orientation = {}
        const lostPositions = {}
        const result = SouthCommand.run(
          0,
          0,
          orientation, 
          { width: 5, height: 0}, 
          lostPositions)
        expect(result.x).to.be.equal(0)
        expect(result.y).to.be.equal(0)
        expect(result.orientation).to.be.equal(orientation)
        expect(result.isInvalidMove).to.be.equal(true)
        expect(lostPositions['0:0']).to.be.equal(true)
      })
      
      it('invalid coordinates existing in lostPositions should return input params', async () => {
        const orientation = {}
        const lostPositions = {'0:0': true}
        const result = SouthCommand.run(
          0,
          0,
          orientation, 
          { width: 5, height: 0}, 
          lostPositions)
        expect(result.x).to.be.equal(0)
        expect(result.y).to.be.equal(0)
        expect(result.orientation).to.be.equal(orientation)
        expect(result.isInvalidMove).to.be.equal(false)
        expect(lostPositions['0:0']).to.be.equal(true)
      })
    })

    describe('East', async () => {
      it('valid coordinates should return increment for X', async () => {
        const result = EastCommand.run(
          0,
          0,
          {},
          { width: 5, height: 3}, 
          {})
        expect(result.x).to.be.equal(1)
      })

      it('invalid coordinates should update lostPositions', async () => {
        const orientation = {}
        const lostPositions = {}
        const result = SouthCommand.run(
          0,
          0,
          orientation, 
          { width: 5, height: 0}, 
          lostPositions)
        expect(result.x).to.be.equal(0)
        expect(result.y).to.be.equal(0)
        expect(result.orientation).to.be.equal(orientation)
        expect(result.isInvalidMove).to.be.equal(true)
        expect(lostPositions['0:0']).to.be.equal(true)
      })
      
      it('invalid coordinates existing in lostPositions should return input params', async () => {
        const orientation = {}
        const lostPositions = {'0:0': true}
        const result = SouthCommand.run(
          0,
          0,
          orientation, 
          { width: 5, height: 0}, 
          lostPositions)
        expect(result.x).to.be.equal(0)
        expect(result.y).to.be.equal(0)
        expect(result.orientation).to.be.equal(orientation)
        expect(result.isInvalidMove).to.be.equal(false)
        expect(lostPositions['0:0']).to.be.equal(true)
      })
    })

    describe('West', async () => {
    it('valid coordinates should return increment for X', async () => {
      const result = WestCommand.run(
        0,
        0,
        {},
        { width: 5, height: 3}, 
        {})
      expect(result.x).to.be.equal(0)
    })

    it('invalid coordinates should update lostPositions', async () => {
      const orientation = {}
      const lostPositions = {}
      const result = SouthCommand.run(
        0,
        0,
        orientation, 
        { width: 5, height: 0}, 
        lostPositions)
      expect(result.x).to.be.equal(0)
      expect(result.y).to.be.equal(0)
      expect(result.orientation).to.be.equal(orientation)
      expect(result.isInvalidMove).to.be.equal(true)
      expect(lostPositions['0:0']).to.be.equal(true)
    })
    
    it('invalid coordinates existing in lostPositions should return input params', async () => {
      const orientation = {}
      const lostPositions = {'0:0': true}
      const result = SouthCommand.run(
        0,
        0,
        orientation, 
        { width: 5, height: 0}, 
        lostPositions)
      expect(result.x).to.be.equal(0)
      expect(result.y).to.be.equal(0)
      expect(result.orientation).to.be.equal(orientation)
      expect(result.isInvalidMove).to.be.equal(false)
      expect(lostPositions['0:0']).to.be.equal(true)
    })
  })
  })

  describe('Left', async () => {
    it('should turn Left', async () => {
      const orientation = {getPrevious: () => {
        return true
      }}
      const result = TurnLeftCommand.run(
        0, 
        0, 
        orientation, 
        { width: 5, height: 3}, 
        {})
      expect(result.orientation).to.be.equal(true)
    })
  })

  describe('Right', () => {
    it('should turn Right', async () => {
      const orientation = {getNext: () => {
        return true
      }}
      const result = TurnRightCommand.run(
        0,
        0,
        orientation,
        { width: 5, height: 3}, 
        {})
      expect(result.orientation).to.be.equal(true)
    })
  })
})
