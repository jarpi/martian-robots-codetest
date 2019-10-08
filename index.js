const express = require('express')
const app = express()
const RobotRouter = require('./src/api/routes/Robot/index.js')
const logger = require('express-bunyan-logger');

const port = process.env.PORT || 30010

app.use(logger());
app.use('/', RobotRouter)

const httpServer = app.listen(port, _ => {
  console.log(`app listen on ${port}`)
  console.log('curl -XPOST -H "Content-Type: application/json" -d \'{"instructions":"5 3\\n1 1 E\\nRFRFRFRF"}\' http://127.0.0.1:' + port + '/execute-robot-instructions')
})

process.on('uncaughtException', (err) => {
    console.error(`uncaughtException::${err}`)
    process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error(`unhandledRejection::${promise}::${reason}`)
})

module.exports = [app, httpServer] // for testing
