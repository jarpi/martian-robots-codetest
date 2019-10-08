const expect = require('chai').expect
const request = require('supertest')
const [server, httpServer] = require('../../../index.js')

describe('API', function () {
  after(function (done) {
    console.dir(server)
    httpServer.close()
    done()
  })
  describe('POST /execute-robot-instructions', function () {
    it('should return correct output if valid instructions', function (done) {
      request(server)
        .post('/execute-robot-instructions')
        .send({ instructions: '5 3\n1 1 E\nRFRFRFRF' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err)
          }
          expect(res.body.output).to.be.equal('1 1 E')
          done()
        })
    })
  })
})
