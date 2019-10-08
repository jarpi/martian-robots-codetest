const express = require('express')
const app = express()
const RobotRouter = require('./src/api/routes/Robot/index.js')

const port = process.env.PORT || 10010

app.use('/', RobotRouter)
const httpServer = app.listen(port, _ => {
  console.log(`app listen on ${port}`)
})

module.exports = [app, httpServer] // for testing
