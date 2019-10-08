const express = require('express')
const app = express()
const RobotRouter = require('./src/api/routes/Robot/index.js')

const port = process.env.PORT || 10010

app.use('/', RobotRouter)

const httpServer = app.listen(port, _ => {
  console.log(`app listen on ${port}`)
  console.dir('curl -XPOST -H "Content-Type: application/json" -d \'{"instructions":"5 3\n1 1 E\nRFRFRFRF"}\' http://127.0.0.1:10010/execute-robot-instructions')
})

module.exports = [app, httpServer] // for testing
