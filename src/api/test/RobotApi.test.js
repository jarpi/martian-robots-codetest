const expect = require('chai').expect
const request = require('supertest')
const [server, httpServer] = require('../../../index.js')

describe('API', function () {
  after(function (done) {
    httpServer.close()
    done()
  })

  describe('POST /execute-robot-instructions', function () {
    it('should return correct output when valid instructions', async () => {
      request(server)
        .post('/execute-robot-instructions')
        .send({ instructions: '5 3\n1 1 E\nRFRFRFRF' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err
          }
          expect(res.body.output).to.be.equal('1 1 E')
        })
    })

    it('should return error when not valid instructions', async () => {
      request(server)
        .post('/execute-robot-instructions')
        .send({ instructions: '5 3\n1 1 E\nT' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function (err, res) {
          if (err) {
            throw err
          }
          expect(res.body.error).to.be.equal('unexisting_command:T')
        })
    })
  })
})
