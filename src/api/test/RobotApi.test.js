const expect = require('chai').expect
const request = require('supertest')

describe('API', function () {
  describe('POST /execute-robot-instructions', function () {
    const [server, httpServer] = require('../../../index.js')
    after(function (done) {
      httpServer.close()
      done()
    })

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

    it('should return error when unexisting orientation', async () => {
      request(server)
        .post('/execute-robot-instructions')
        .send({ instructions: '5 3\n1 1 U\nT' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function (err, res) {
          if (err) {
            throw err
          }
          expect(res.body.error).to.be.equal('unexisting_node::U')
        })
    })
  })
})
